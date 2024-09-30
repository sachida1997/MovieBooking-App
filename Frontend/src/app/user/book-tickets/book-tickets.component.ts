import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IBookTicketBody, IPayLoad, UserfuncService } from 'src/app/services/userfunc.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent {
  movie: IPayLoad | null = null;
  newTickets : number=1

  constructor(private userfunc: UserfuncService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get("id"));
      this.getMovieData(params.get("id"));
    });

  }
  getMovieData(id: any) {
    this.userfunc.getMovieById(id).subscribe((data) => {
      this.movie = data;
      console.log(data);
    })
  }

  bookMovieTickets(){
    if(!this.movie){
      return;
    }

    let movieTicket:IBookTicketBody = {
      movieIdFk:this.movie.movieId,
      noOfTicket:this.newTickets
    }
    
    this.userfunc.bookTickets(movieTicket).subscribe((data)=>{
      this.router.navigateByUrl('/user-dashboard');
      console.log(data);
    })
  }
}

