import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, IPayLoad } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  movies:IPayLoad[]=[];

  constructor(private admin:AdminService,private router:Router){}

  ngOnInit(){
    this.fetchAllMovies();
  }

  fetchAllMovies(){
    this.admin.fetchMovies().subscribe((data)=>{
      if(data && data.body && data.body.PayLoad){
      this.movies=data.body.PayLoad;
      } else{
        this.movies=[];
      }
    })
  }
  update(){
    this.admin.updateMovie(this.movies).subscribe((data)=>{
      this.router.navigate(["/update-movie"])
    })
  }

  delete(id:number){
    this.admin.deleteMovie(id).subscribe((data)=>{
      
      this.fetchAllMovies();
    })
  }
}
