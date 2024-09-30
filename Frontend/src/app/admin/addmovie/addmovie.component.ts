import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, IPayLoad } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {

  public movie={
    movieId:'',
    movieName:'',
    theatreName:'',
    ticketsAvailable:''
  }
  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() {
  }

  addMovie(){
    this.admin.addMovie(this.movie).subscribe((data)=>{
      console.log(data);
      this.router.navigateByUrl('/admin');
    })
  }

}
