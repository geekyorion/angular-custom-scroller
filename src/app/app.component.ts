import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { getID, getName } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items_1: Array<{name: string, id: number}> = [];
  items_2: Array<{name: string, id: number}> = [];

  ngOnInit() {
    this.generateItems(50, this.items_1);
    this.generateItems(20, this.items_2);
  }

  generateItems(limit: number, items_array: Array<{name: string, id: number}>) {
    for (let i = 0; i < limit; i++) {
      items_array.push({
        name: getName(),
        id: getID()
      });
    }
  }
}
