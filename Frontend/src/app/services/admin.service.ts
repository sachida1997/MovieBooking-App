import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // public movies: BehaviorSubject<IPayLoad[]> = new BehaviorSubject<IPayLoad[]>([]);
 
  constructor(private http:HttpClient) { }

  public fetchMovies(){
    return this.http.get<IMovieResponse>('http://localhost:8082/api/v1.0/movie/all')
  }

  public addMovie(movie:any){
    return this.http.post('http://localhost:8082/api/v1.0/movie/addMovie',movie);
  }

  public updateMovie(movie:any){
    return this.http.put("http://localhost:8082/api/v1.0/movie/updateMovie",movie,{responseType:"text"});
  }

  public deleteMovie(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/api/v1.0/movie/delete/${id}`);
  } 

  public getMovieById(id:number):Observable<IPayLoad>{
    return this.http.get<IPayLoad>(`http://localhost:8082/api/v1.0/movie/get/${id}`);
  }
}

export interface IMovieResponse {
  headers: IHeaders
  body: IBody
  statusCode: string
  statusCodeValue: number
}

export interface IHeaders {}

export interface IBody {
  "Status Code": number
  "Custom Message": string
  PayLoad: IPayLoad[]
}

export interface IPayLoad {
  movieId: number
  movieName: string
  theatreName?: string
  ticketsAvailable: number
  ticketsBooked: number
  ticket: any[]
}
