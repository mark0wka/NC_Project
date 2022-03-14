import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cinema} from "./cinema";
import {environment} from "../environments/environment";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCinemas(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/cinema/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getHalls(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/halls/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getSeats(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/seats/all")//"${this.apiServerUrl}/cinema/all");
  }

  public getFilms(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/films/all")
  }

  public getSessions(): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/sessions/all")
  }

  public getHallsByCinemaName(cinemaName: string): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + '/halls/' + cinemaName);
  }

  public getSessionsByFilmId(filmId: number): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + '/sessions/' + filmId);
  }

  public getSessionsByCinemaName(cinemaName: string): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + '/sessions/' + cinemaName);
  }

  public getSeatsBySessionId(sessionId: number): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + "/seats/" + sessionId);
  }


  public addCinema(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>(this.apiServerUrl + '/create/cinema', requestBody)
  }

  public addFilm(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>(this.apiServerUrl + '/create/film', requestBody)
  }

  public addHall(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>(this.apiServerUrl + '/create/hall', requestBody)
  }

  public addSession(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.post<EntityObject>(this.apiServerUrl + '/create/session', requestBody)
  }

  public updateSeat(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.put<EntityObject>(this.apiServerUrl + '/update/seat', requestBody)
  }

  public addUser(user: User): Observable<String> {
    return this.http.post<String>(this.apiServerUrl + '/registration', user)
  }

}
