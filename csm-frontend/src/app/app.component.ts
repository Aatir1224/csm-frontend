import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'csm-frontend';
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
