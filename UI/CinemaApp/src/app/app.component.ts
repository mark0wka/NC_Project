import {Component, OnInit, Pipe} from '@angular/core';
import {Cinema} from "./cinema";
import {CinemaService} from "./cinema.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";
import {Attribute} from "./attribute";
import {Seat} from "./seat";
import {bookSeats} from "./book.seats";
import {User} from "./user";


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
  public cols: Seat[] = [];
  public rows: Seat[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    this.getFilms();
  }

  public onAddUser(registrationForm: NgForm): void {
    document.getElementById('registration')!.click();
    let req: User = {
      username: registrationForm.value.username,
      password: registrationForm.value.password
    }
    this.cinemaService.addUser(req).subscribe(
      (response:String) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        2: this.getCinemaByName(addHallForm.value.cinemaName) + "",
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
        6: this.getCinemaByName(addSessionForm.value.cinemaName) + "",
        7: this.getHallByName(addSessionForm.value.hallName, addSessionForm.value.cinemaName) + "",
        8: this.getFilmByName(addSessionForm.value.filmName) + "",
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

  // onUpdateSeat(name: string): void {
  //   let req: bookSeats = {
  //
  //   }
  //   this.cinemaService.updateSeat(req).subscribe(
  //     (response:EntityObject) => {
  //       this.getSeats();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

  public findById(attributes: Attribute[], id: number): string{
    return attributes.find(x => x.attrId == id)!.value;
  }


  public getFilm(id: number): EntityObject{
    return this.films.find(x=> x.objectId == id)!
  }

  public getCinemaByName(name: string): number {
    return this.cinemas.find(x=> x.name == name)!.objectId
  }

  public getFilmByName(name: string): number {
    return this.films.find(x=> x.name == name)!.objectId
  }

  public getHallByName(hallName: string, cinemaName: string): number {
    return this.halls.find(x=> x.name == hallName)!.objectId
  }

  public saveCurFilm(id: number) {
    this.curFilmId = id;
  }

  public saveCurSessionInfo(sessionId: number, cinemaId: number) {
    this.curSessionId = sessionId;
    this.curCinemaId = cinemaId;
  }

  public getCurFilmName(): string {
    if(this.curFilmId == 0) {
      return "";
    } else {
      return this.getFilm(this.curFilmId).name;
    }
  }

  public getById(id: number): string{
    if(this.curFilmId == 0) {
      return "";
    } else {
      return this.findById(this.getFilm(this.curFilmId).attributes, id);
    }
  }

  // public getHallsByCinemaName (name : string): EntityObject[] {
  //   let res: EntityObject[] = [];
  //   if (name == "") {
  //     return res;
  //   } else {
  //     let cinemaId = this.getCinemaByName(name);
  //
  //     for (let i = 0; i < this.halls.length; i++) {
  //       if (this.halls[i].attributes.find(x => x.attrId == 2)!.value == cinemaId.toString()) {
  //         res.push(this.halls[i]);
  //       }
  //     }
  //     return res;
  //   }
  // }

  public getSessionsByCinemaId (cinemaId: number): EntityObject[] {
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

  // public getSessionsByCinemaNameAndFilmName (cinemaName : string, filmName: string): EntityObject[] {
  //   let res: EntityObject[] = [];
  //   if (cinemaName == "" || filmName == "") {
  //     return res;
  //   } else {
  //     let cinemaId = this.getCinemaByName(cinemaName);
  //     let filmId = this.getFilmByName(filmName);
  //
  //     for (let i = 0; i < this.sessions.length; i++) {
  //       if (this.sessions[i].attributes.find(x => x.attrId == 6)!.value == cinemaId.toString() && this.sessions[i].attributes.find(x => x.attrId == 8)!.value == filmId.toString()) {
  //         res.push(this.sessions[i]);
  //       }
  //     }
  //     return res;
  //   }
  // }

  // public getSeatsBySessionId (id : number): EntityObject[] {
  //   let res: EntityObject[] = [];
  //   if (id == 0) {
  //     return res;
  //   } else {
  //     for (let i = 0; i < this.seats.length; i++) {
  //       if (this.seats[i].attributes.find(x => x.attrId == 22)!.value == id.toString()) {
  //         res.push(this.seats[i]);
  //       }
  //     }
  //     return res;
  //   }
  // }

  // public getCols (): Seat[]{
  //   let col: Seat[] = [];
  //   if (this.curSessionId == 0) {
  //     return col;
  //   }
  //   let hall = this.halls.find(x=> x.objectId == parseInt(this.sessions.find(y => y.objectId == this.curSessionId)!.attributes.find(z => z.attrId == 7)!.value))!
  //   for (let i = 1; i <= parseInt(hall.attributes.find(x => x.attrId == 3)!.value); i++) {
  //     let element: Seat = {
  //       name: i + "",
  //     }
  //     col.push(element);
  //
  //   }
  //   this.cols = col;
  //   return col;
  // }
  //
  // public getRows (col: Seat): Seat[]{
  //   let rows: Seat[] = [];
  //   if (col == null) {
  //     return col;
  //   }
  //   let hall = this.halls.find(x=> x.objectId == parseInt(this.sessions.find(y => y.objectId == this.curSessionId)!.attributes.find(z => z.attrId == 7)!.value))!
  //   for (let i = 1; i <= parseInt(hall.attributes.find(x => x.attrId == 4)!.value); i++) {
  //     let element: Seat = {
  //       name: col.name + "-" + i,
  //     }
  //     rows.push(element);
  //   }
  //   return rows;
  // }

  public isBought (colName: string, rowName: string): boolean {
    if(colName == "" || rowName == "") {
      return false
    }
    let name: string = colName + "-" + rowName;
    let seat: EntityObject = this.seats.find(x => x.name == name)!;
    if (seat == undefined) { return false };
    let res: string = seat.attributes.find(y => y.attrId == 23)!.value;
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

}
