import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserfuncService {
  constructor(private http:HttpClient) { }

  public getMovie():Observable<IMovieResponse>{
    return  this.http.get<IMovieResponse>('http://localhost:8082/api/v1.0/movie/all');
  }

  public getMovieById(id:number):Observable<IPayLoad>{
    return this.http.get<IPayLoad>(`http://localhost:8082/api/v1.0/movie/get/${id}`);
  }

  public bookTickets(movieTicket:IBookTicketBody){
    return this.http.post('http://localhost:8082/api/v1.0/ticket/bookTicket',movieTicket);
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

export interface IBookTicketBody {
  movieIdFk:number,
  noOfTicket:number
}
