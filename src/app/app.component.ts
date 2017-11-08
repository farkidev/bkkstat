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
  stopIds: string[][] = [];
  distinctStopIds: string[] = [];
  stopsReadyCount = 0;

  routeIds = ['BKK_MP533', 'BKK_MP53', 'BKK_MP531'];

  constructor(
    private futarService: FutarService
  ) {
  }

  public getStopIds() {
    this.routeIds.forEach( r => {
      this.stopsReadyCount = 0;
      this.futarService.getStopsForRoute(r).subscribe(res => {
        res.forEach(rs => {
          this.stopIds.push(rs.stopIds);
        });
        this.stopsReadyCount++;
        // if (this.stopsReadyCount === this.routeIds.length) {
        //   this.getDistinctIds();

        //   console.log(this.distinctStopIds);
        // }
      });
    });
  }

  private getDistinctIds() {
    this.stopIds.forEach(ids => {
      ids.forEach(id => {
        if (this.distinctStopIds.some(di => di === id) === false) {
          this.distinctStopIds.push(id);
          // console.log(this.distinctStopIds);
        }
      });
    });
  }

  ngOnInit() {
    // this.futarService.getStopsForRoute('BKK_F00979', new Date(Date.now())).subscribe(
    //   res => {this.retVal = res; }
    // );
    //
    // BKK_F01234
    // this.futarService.getStopsForRoute('BKK_MP533').subscribe(
    //   res => {this.retVal = res; }
    // );
    //
    // this.futarService.getScheduleForStop('BKK_F01234').subscribe(
    //   res => {
    //     this.futarService.uploadSchedule(res).subscribe(
    //       uri => {
    //         this.retVal = `BKK_F01234: ${uri}`;
    //       }
    //     );
    //   }
    // );
  }
}
