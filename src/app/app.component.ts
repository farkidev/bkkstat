import { FutarService } from './core/futar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  retVal: any = '';

  constructor(
    private futarService: FutarService
  ) {
  }

  ngOnInit() {
    // this.futarService.getStopsForRoute('BKK_F00979', new Date(Date.now())).subscribe(
    //   res => {this.retVal = res; }
    // );
    // BKK_F01234
    // this.futarService.getStopsForRoute('BKK_MP533').subscribe(
    //   res => {this.retVal = res; }
    // );
    this.futarService.getScheduleForStop('BKK_F01234').subscribe(
      res => {this.retVal = res; }
    );
  }
}
