import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AdminService, IPayLoad } from 'src/app/services/admin.service';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent {

  movie:IPayLoad | null= null;

  constructor(private admin: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get("id"));
      this.getMovieData(params.get("id"));
    });

  }
  getMovieData(id:any) {
    this.admin.getMovieById(id).subscribe((data)=>{
      this.movie = data;
      console.log(data); 
    })
  }

  updateMovie(){
    this.admin.updateMovie(this.movie).subscribe((data)=>{
      this.router.navigateByUrl('/admin');  
    })
    
  }

}
