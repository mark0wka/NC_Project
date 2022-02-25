import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cinema} from "./cinema";
import {environment} from "../environments/environment";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCinemas(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>("http://localhost:8080/cinema/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getHalls(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>("http://localhost:8080/halls/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getSeats(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>("http://localhost:8080/seats/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getFilms(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>("http://localhost:8080/films/all")
  }

  public addCinema(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>('http://localhost:8080/create/cinema', requestBody)
  }

  public addFilm(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>('http://localhost:8080/create/film', requestBody)
  }

  public addHall(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>('http://localhost:8080/create/hall', requestBody)
  }

}
