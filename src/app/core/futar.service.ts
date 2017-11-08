import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as process from 'process';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IScheduleForStopEntry, IScheduleForStopResponse, ScheduleForStopEntry } from './stopTime';

const baseUrl = environment.apiRootUrl;

@Injectable()
export class FutarService {

  constructor(private http: HttpClient) { }

  public getStopsForRoute(routeId: string): Observable<any> {
    const url = baseUrl + 'route-details.json?routeId=' + routeId;
    return this.http.get<IStopInfo>(url).map(si => {
      const res: RouteStops[] = [];
      si.data.entry.variants.forEach(v => {
        const rs = new RouteStops();
        rs.initFromInterface(v);
        res.push(rs);
      });
      return res;
    });
  }

  public getScheduleForStop(stopId: string, date?: Date): Observable<IScheduleForStopEntry> {
    let url = baseUrl + 'schedule-for-stop.json?stopId=' + stopId;
    if (date !== undefined) {
      url += '&date=' + moment(date).format('YYYYMMDD');
    }
    return this.http.get<IScheduleForStopResponse>(url).map(
      (res) => ScheduleForStopEntry.reducedSchedules(res.data.entry)
    );
  }

  public uploadSchedule(body: any): Observable<string> {
    return this.http.post<{uri: string}>(environment.jsonApi, body)
          .map(juri =>
            juri.uri
          );
  }

  // private processScheduleResponse(json: any): any {
  //   if (json.data !== undefined
  //     && json.data.routes !== undefined
  //     && json.data.routes !== undefined) {
  //       return json;
  //   }
  //   return 'error';
  // }
}

interface IStopInfo {
  data?: {
    entry: {
      variants: IRouteStops[]
    }
  };
}

class StopInfo implements IStopInfo {
  constructor (
    public data?: {
      entry: {
        variants: IRouteStops[]
      }
    }
  ) {}
}

interface IRouteStops {
  routeId?: string;
  name?: string;
  stopIds?: string[];
  headsign?: string;
}

class RouteStops implements IRouteStops {
  constructor(
    public routeId?: string,
    public name?: string,
    public stopIds?: string[],
    public headsign?: string,
  ) {}


  public initFromInterface(val: IRouteStops) {
    this.routeId = val.routeId;
    this.name = val.name;
    this.headsign = val.headsign;
    this.stopIds = val.stopIds;
  }
}


