import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'asha-web-ordering-bar',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatToolbarModule
  ],
  templateUrl: './web-ordering-bar.component.html',
  styleUrl: './web-ordering-bar.component.scss'
})
export class WebOrderingBarComponent implements OnInit{

  constructor(
    public _router : Router,
    public location : Location
  ) {
    console.log(this.back);
    console.log(this.title);
    console.log(true)
    
  }
  @Input() title: string;
  @Input() back: boolean;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.back);
    console.log(this.title);
  }

  open() {
    const item  = {...localStorage}
    alert(JSON.stringify(item))
  }
}
