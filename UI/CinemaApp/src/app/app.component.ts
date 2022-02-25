import {Component, OnInit, Pipe} from '@angular/core';
import {Cinema} from "./cinema";
import {CinemaService} from "./cinema.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";
import {Attribute} from "./attribute";


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
  public curFilmId: number = 0;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    this.getCinemas();
    this.getFilms();
    this.getHalls();
    this.getSeats();
  }

  public getCinemas(): void {
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

  public getHalls(): void {
    this.cinemaService.getHalls().subscribe(
      (response: EntityObject[]) => {
        this.halls = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        this.getCinemas();
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
        console.log(response);
        this.getHalls();
        this.getSeats();
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
        this.getCinemas();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public findById(attributes: Attribute[], id: number): string{
    return attributes.find(x => x.attrId == id)!.value;
  }

  public getFilm(id: number): EntityObject{
    return this.films.find(x=> x.objectId == id)!
  }

  public getCinemaByName(name: string): number {
    return this.cinemas.find(x=> x.name == name)!.objectId
  }

  public onClick(id: number) {
    this.curFilmId = id;
  }

  public getName(): string {
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
}
