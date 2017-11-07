import { HttpClient } from '@angular/common/http';
import * as process from 'process';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

const baseUrl = 'http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/';

@Injectable()
export class FutarService {

  constructor(private http: HttpClient) { }

  public getStopsForRoute(routeId: string): Observable<any> {
    const url = baseUrl + 'route-details.json?stopId=' + routeId;
    return this.http.get<StopInfo>(url).map(si => {
      const res: RouteStops[] = [];
      si.data.entry.variants.forEach(v => {
        res.push(v);
      });
      return res;
    });
  }

  // public getScheduleForStop(stopId: string, date?: Date): Observable<any> {
  //   let url = baseUrl + 'schedule-for-stop.json?stopId=' + stopId;
  //   if (date !== undefined) {
  //     url += '&date=' + moment(date).format('YYYYMMDD');
  //   }
  //   return this.http.get(url).map(
  //     (res) => this.processScheduleResponse(res.json()),
  //     (err) => { throw err; }
  //   );
  // }

  private processScheduleResponse(json: any): any {
    if (json.data !== undefined
      && json.data.routes !== undefined
      && json.data.routes !== undefined) {
        return json;
    }
    return 'error';
  }
}

interface StopInfo {
  data: {
    entry: {
      variants: RouteStops[]
    }
  };
}

interface RouteStops {
  routeId: string;
  name: string;
  stopIds: string[];
  headsign: string;
}
