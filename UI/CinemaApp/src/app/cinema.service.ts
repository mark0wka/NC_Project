import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cinema} from "./cinema";
import {environment} from "../environments/environment";
import {RequestBody} from "./request.body";
import {EntityObject} from "./entity.object";
import {User} from "./user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
    return this.http.get<EntityObject[]>(this.apiServerUrl + '/sessions/filmid/' + filmId);
  }

  public getSessionsByCinemaId(cinemaId: number): Observable<EntityObject[]> {
    return this.http.get<EntityObject[]>(this.apiServerUrl + '/sessions/cinemaid/' + cinemaId);
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
    console.log(this.http.post<EntityObject>(this.apiServerUrl + '/create/session', requestBody, httpOptions));
    return this.http.post<EntityObject>(this.apiServerUrl + '/create/session', requestBody, httpOptions)
  }

  public updateSeat(requestBody: RequestBody): Observable<EntityObject> {
    return this.http.put<EntityObject>(this.apiServerUrl + '/update/seat', requestBody)
  }

  public login(credentials: User): Observable<any> {
    return this.http.post(this.apiServerUrl + '/signin', credentials, httpOptions);
  }

  public register(user: any): Observable<any> {
    return this.http.post(this.apiServerUrl + '/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  public updateSeats(req: any): Observable<any> {
    return this.http.put(this.apiServerUrl + '/update/seats', req);
  }

}
