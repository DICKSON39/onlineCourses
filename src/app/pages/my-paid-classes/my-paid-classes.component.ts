import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassService} from '../../services/class.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassPlayerComponent} from '../class-player/class-player.component';

@Component({
  selector: 'app-my-paid-classes',
  imports: [CommonModule,ReactiveFormsModule,ClassPlayerComponent],
  templateUrl: './my-paid-classes.component.html',
  styleUrl: './my-paid-classes.component.css'
})
export class MyPaidClassesComponent  implements OnInit {
  classes: any[] = [];
  loading:boolean = false;
  constructor( private  classService : ClassService ) {
  }

    ngOnInit(): void {
      this.loading = true;
    this.classService.getMyPaidClasses().subscribe({
      next: (res)=> {
        this.classes = res.classes;
        this.loading = false;
      },
      error: (err)=> {
        console.error('Error', err)
        this.loading = false;
      }
    })


    }

}
