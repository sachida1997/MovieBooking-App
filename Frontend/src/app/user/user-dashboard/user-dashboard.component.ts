import { Component } from '@angular/core';
import { AdminService, IBody, IPayLoad } from 'src/app/services/admin.service';
import { UserfuncService } from 'src/app/services/userfunc.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  movies:IPayLoad[]=[];

  constructor(private userfunc:UserfuncService){}

  ngOnInit(){
    this.userfunc.getMovie().subscribe((data)=>{
      console.log(data);
      
      this.movies = data.body.PayLoad;

      console.log(data.body.PayLoad);
    })
  }
}
