import {Component, OnInit, Pipe} from '@angular/core';
import {Cinema} from "./cinema";
import {CinemaService} from "./cinema.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";
import {Attribute} from "./attribute";
import {Seat} from "./seat";
import {User} from "./user";
import {TokenStorageService} from "./token.storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cinemas: EntityObject[] = [];
  public halls: EntityObject[] = [];
  public seats: EntityObject[] = [];
  public films: EntityObject[] = [];
  public sessions: EntityObject[] = [];
  public curFilmId: number = 0;
  public curSessionId: number = 0;
  public curCinemaId: number = 0;
  public curHallId: number = 0;
  public cols: Seat[] = [];
  public rows: Seat[] = [];
  public responseMessage: string = "";
  public selectedSeatsIds: number[] = [];
  public selectedSeatsNames: string[] = [];

  public token: string = "";
  public isRegistrationFailed: boolean = false;
  public isLoginFailed: boolean = false;
  public isLoggedIn: boolean = false;
  public roles: string[] = [];
  public username: string = "";
  public userId: number = -1;

  constructor(private cinemaService: CinemaService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.getFilms();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      this.userId = this.tokenStorage.getUser().id;
      this.token = this.tokenStorage.getToken();
    }
  }

  public onRegister(registrationForm: NgForm): void {
    document.getElementById('registration')!.click();
    let req: any = {
      username: registrationForm.value.username,
      email: registrationForm.value.email,
      password: registrationForm.value.password
    }
    this.cinemaService.register(req).subscribe(
      response => {
        console.log(response);
        this.isRegistrationFailed = false;
        this.responseMessage = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.isRegistrationFailed = true;
        this.responseMessage = error.message;
      }
    );
  }

  public onLogin(loginForm: NgForm): void {
    document.getElementById('login')!.click();
    let loginToast = document.getElementById('liveToast')
    let req: User = {
      username: loginForm.value.username,
      password: loginForm.value.password
    }
    console.log(req);
    this.cinemaService.login(req).subscribe(
      response => {
        console.log(response);
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.responseMessage = "Successful";
        this.username = response.username;
        this.userId = response.id;
        // let toast = new Toast(loginToast)
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.responseMessage = "Login Failed"
      }
    );
  }

  public getCinemas(): void {
    console.log("getCinemas")
    this.cinemaService.getCinemas().subscribe(
      (response: EntityObject[]) => {
        this.cinemas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFilms(): void {
    this.cinemaService.getFilms().subscribe(
      (response: EntityObject[]) => {
        this.films = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getHalls(): void {
  //   this.cinemaService.getHalls().subscribe(
  //     (response: EntityObject[]) => {
  //       this.halls = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public getSessions(): void {
  //   this.cinemaService.getSessions().subscribe(
  //     (response: EntityObject[]) => {
  //       this.sessions = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public getHallsByCinemaName(cinemaName: string): void {
    this.cinemaService.getHallsByCinemaName(cinemaName).subscribe(
      (response: EntityObject[]) => {
        this.halls = [];
        this.halls = response;
      },
      (error: HttpErrorResponse) => {
        this.halls = [];
      }
    );
  }

  public getSessionsByFilmId(filmId: number): void {
    this.cinemaService.getSessionsByFilmId(filmId).subscribe(
      (response: EntityObject[]) => {
        this.sessions = [];
        this.sessions = response;
      },
      (error: HttpErrorResponse) => {
        this.sessions = [];
      }
    );
  }

  public getSessionsByCinemaId(cinemaId: number): void {
    this.cinemaService.getSessionsByCinemaId(cinemaId).subscribe(
      (response: EntityObject[]) => {
        this.sessions = [];
        this.sessions = response;
      },
      (error: HttpErrorResponse) => {
        this.sessions = [];
      }
    );
  }

  public getSeatsBySessionId(sessionId: number): void {
    this.cinemaService.getSeatsBySessionId(sessionId).subscribe(
      (response: EntityObject[]) => {
        this.seats = [];
        this.seats = response;
      },
      (error: HttpErrorResponse) => {
        this.seats = [];
      }
    );
  }

  public getSeats(): void {
    this.cinemaService.getSeats().subscribe(
      (response: EntityObject[]) => {
        this.seats = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCinema(addCinemaForm: NgForm): void {
    document.getElementById('add-cinema')!.click();
    let req: RequestBody = {
      name: addCinemaForm.value.cinemaName,
      objTypeId: "Cinema",
      attrMap: {
        1: addCinemaForm.value.cinemaAddress,
      }
    }
    this.cinemaService.addCinema(req).subscribe(
      (response:EntityObject) => {
        console.log(response);
        //this.getCinemas();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddHall(addHallForm: NgForm): void {
    document.getElementById('add-hall')!.click();
    let req: RequestBody = {
      name: addHallForm.value.hallNumber,
      objTypeId: "Hall",
      attrMap: {
        2: this.getCinemaIdByName(addHallForm.value.cinemaName) + "",
        3: addHallForm.value.hallCols,
        4: addHallForm.value.hallRows,
      }
    }
    console.log(req)

    this.cinemaService.addHall(req).subscribe(
      (response:EntityObject) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSession(addSessionForm: NgForm): void {
    document.getElementById('add-session')!.click();
    let req: RequestBody = {
      name: addSessionForm.value.filmName + "_" + addSessionForm.value.time,
      objTypeId: "Session",
      attrMap: {
        5: addSessionForm.value.time,
        6: this.getCinemaIdByName(addSessionForm.value.cinemaName) + "",
        7: this.getHallIdByName(addSessionForm.value.hallName) + "",
        8: this.getFilmIdByName(addSessionForm.value.filmName) + "",
        9: addSessionForm.value.price + "",
      }
    }
    console.log(req)

    this.cinemaService.addSession(req).subscribe(
      (response:EntityObject) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFilm(addFilmForm: NgForm): void {
    document.getElementById('add-film')!.click();
    let req: RequestBody = {
      name: addFilmForm.value.filmName,
      objTypeId: "Film",
      attrMap: {
        10: addFilmForm.value.filmDirector,
        11: addFilmForm.value.filmGenre,
        12: addFilmForm.value.filmCountry,
        13: addFilmForm.value.filmLength,
        14: addFilmForm.value.filmDescription,
        15: addFilmForm.value.filmPosterURL,
        16: addFilmForm.value.filmTrailerURL
      }
    }
    console.log(req);
    this.cinemaService.addFilm(req).subscribe(
      (response:EntityObject) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateSeats (): void {
    let req: any = {
      user: this.tokenStorage.getUser().id,
      seatsId: this.selectedSeatsIds
    }
    console.log(req);
    this.cinemaService.updateSeats(req).subscribe(
      data => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.selectedSeatsIds = [];
    this.selectedSeatsNames = [];
  }

  public isUserAdmin(): boolean {
    return this.roles[0] == "ADMIN";
  }

  public logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  public getAttributeById(attributes: Attribute[], id: number): string{
    return attributes.find(x => x.attrId == id)!.value;
  }

  public getFilmById(id: number): EntityObject{
    return this.films.find(x=> x.objectId == id)!
  }

  public getCinemaIdByName(name: string): number {
    return this.cinemas.find(x=> x.name == name)!.objectId
  }

  public getFilmIdByName(name: string): number {
    return this.films.find(x=> x.name == name)!.objectId
  }

  public getHallIdByName(name: string): number {
    return this.halls.find(x=> x.name == name)!.objectId
  }

  public getCinemaNameById(id: number): string {
    if(this.cinemas.length == 0) {
      return "";
    }
    let cinema = this.cinemas.find(x => x.objectId == id)!;
    if (cinema == undefined) {
      return "";
    }
    return cinema.name;
  }

  public getHallByCinemaIdAndSessionId(cinemaId: number, sessionId: number): string {
    if (this.halls.length == 0 && this.sessions.length == 0) {
      return "";
    }
    let session = this.sessions.find(x => x.objectId == sessionId)!;
    if (session == undefined) {return "";}
    let hallId = parseInt(session.attributes.find(y => y.attrId == 7)!.value);
    if (hallId == null) {return "";}
    let hall = this.halls.find(x => x.objectId == hallId)!;
    if (hall == undefined) {return ""}
    return hall.name;
  }

  public saveCurFilm(id: number) {
    this.curFilmId = id;
  }

  public saveCurCinema(id: number) {
    this.curCinemaId = id;
  }

  public saveCurSessionInfo(sessionId: number, cinemaId: number) {
    this.curSessionId = sessionId;
    this.curCinemaId = cinemaId;
  }

  public getCurFilmName(): string {
    if(this.curFilmId == 0) {
      return "";
    } else {
      return this.getFilmById(this.curFilmId).name;
    }
  }

  public getFilmAttributeById(id: number): string{
    if(this.curFilmId == 0) {
      return "";
    } else {
      return this.getAttributeById(this.getFilmById(this.curFilmId).attributes, id);
    }
  }

  public getLocalSessionsByCinemaId (cinemaId: number): EntityObject[] {
    let res: EntityObject[] = [];
    if (cinemaId == null){
      return res;
    }
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].attributes.find(x => x.attrId == 6)!.value == cinemaId.toString()) {
        res.push(this.sessions[i]);
      }
    }
    return res;
  }

  public getLocalSessionsByFilmId (filmId: number): EntityObject[] {
    let res: EntityObject[] = [];
    if (filmId == null){
      return res;
    }
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].attributes.find(x => x.attrId == 8)!.value == filmId.toString()) {
        res.push(this.sessions[i]);
      }
    }
    return res;
  }

  public getSessionAttributeBySessionIdAndAttrId (sessionId: number, attrId: number): string {
    if(this.sessions.length == 0) {
      return "";
    }
    let session = this.sessions.find(x => x.objectId == sessionId)!;
    if (session == undefined) {
      return "";
    }
    let attributes = session.attributes;
    return this.getAttributeById(attributes, attrId);
  }

  public isBought (colName: string, rowName: string): boolean {
    if(colName == "" || rowName == "") {
      return false
    }
    let name: string = colName + "-" + rowName;
    let seat: EntityObject = this.seats.find(x => x.name == name)!;
    if (seat == undefined) { return false; }
    let attribute: Attribute = seat.attributes.find(y => y.attrId == 23)!;
    if(attribute == undefined) { return  false; }
    let res: string = attribute.value;
    return res == "true";

  }

  public clear (): void {
    this.sessions = [];
    this.seats = [];
    this.cinemas = [];
    this.halls = [];
  }

  public async generateHallTable(sessionId: number, cinemaName: string) {
    this.getSeatsBySessionId(sessionId);
    this.getHallsByCinemaName(cinemaName);
    let session: EntityObject = this.sessions.find(y => y.objectId == sessionId)!;
    let hallId: string = session.attributes.find(z => z.attrId == 7)!.value;
    await new Promise(f => setTimeout(f, 50));

    let hall: EntityObject = this.halls.find(x => x.objectId == parseInt(hallId))!;
    this.curHallId = hall.objectId;
    let hallRows: number = parseInt(hall.attributes.find(a => a.attrId == 3)!.value);
    let hallCols: number = parseInt(hall.attributes.find(b => b.attrId == 4)!.value);
    this.rows = []
    this.cols = []

    for (let i = 1; i <= hallRows; i++) {
      let col: Seat = {
        name: i + "",
      }
      this.cols.push(col);
    }
    for (let j = 1; j <= hallCols; j++) {
      let row: Seat = {
        name: j + "",
      }
      this.rows.push(row);
    }
  }

  public selectSeat(colName: string, rowName: string){
    if(colName == "" || rowName == "") { return; }
    let name: string = colName + "-" + rowName;
    let seat: EntityObject = this.seats.find(x => x.name == name)!;
    if (seat == undefined) { return; }
    let id: number = seat.objectId;
    if(id == null) { return; }
    if(this.selectedSeatsIds.includes(id)) {
      let index: number = this.selectedSeatsIds.indexOf(id);
      this.selectedSeatsIds.splice(index, 1)
      this.selectedSeatsNames.splice(index,  1);
      return;
    }
    this.selectedSeatsIds.push(id);
    this.selectedSeatsNames.push(name);
  }

  public isSelected(colName: string, rowName: string): boolean {
    if (colName == "" || rowName == "") {
      return false
    }
    let name: string = colName + "-" + rowName;
    let seat: EntityObject = this.seats.find(x => x.name == name)!;
    if (seat == undefined) {
      return false;
    }
    let id: number = seat.objectId;
    if (id == null) {
      return false;
    }
    return this.selectedSeatsIds.includes(id);
  }

  public selectedSeatsToSting(): string {
    if (this.selectedSeatsNames.length == 0) {
      return "";
    }
    let str: string = "";
    this.selectedSeatsNames.forEach(x => str += x + ", ");
    return str.substring(0, str.length - 2);
  }

}
