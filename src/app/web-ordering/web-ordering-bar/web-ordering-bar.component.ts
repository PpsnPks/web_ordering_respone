import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
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
export class WebOrderingBarComponent {

  constructor(
    public _router : Router,
    public location : Location
  ) {

  }
  @Input() title: string;
  @Input() back: boolean;

  open() {
    const item  = {...localStorage}
    alert(JSON.stringify(item))
  }
}
