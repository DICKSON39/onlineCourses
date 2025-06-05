import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassService} from '../../services/class.service';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-paid-classes',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './my-paid-classes.component.html',
  styleUrl: './my-paid-classes.component.css'
})
export class MyPaidClassesComponent  implements OnInit {
  classes: any[] = [];
 isLoading = true;
  skeletonArray = Array(3);
  constructor( private  classService : ClassService ) {
  }

    ngOnInit(): void {

    this.classService.getMyPaidClasses().subscribe({
      next: (res)=> {
        this.classes = res.classes;
        this.isLoading = false;
      },
      error: (err)=> {
        console.error('Error', err)
        this.isLoading = false;
      }
    })


    }

}
