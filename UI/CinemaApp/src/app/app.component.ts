import {Component, OnInit} from '@angular/core';
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
  public films: EntityObject[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    this.getCinemas();
    this.getFilms();
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

  public onAddCinema(addCinemaForm: NgForm): void {
    document.getElementById('add-cinema')!.click();
    let req: RequestBody = {
      name: addCinemaForm.value.cinemaName,
      objTypeId: "Cinema",
      attrMap: {
        1: addCinemaForm.value.cinemaAddress,
      }
    }
    this.halls.length = addCinemaForm.value.hallsNumber;
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
        2: addHallForm.value.cinemaAddress,
      }
    }
    this.halls.length = addHallForm.value.hallsNumber;
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
    console.log(attributes.find(x => x.attrId == id)!.value);
    return attributes.find(x => x.attrId == id)!.value;
  }
}
