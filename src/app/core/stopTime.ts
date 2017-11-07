export interface IStopTime {
    stopHeadsign?: string;
    arrivalTime?: number;
    departureTime?: number;
    predictedArrivalTime?: number;
    predictedDepartureTime?: number;
    tripId?: string;
    serviceDate?: Date;
    wheelchairAccessible?: boolean;
    groupIds?: string[];
}

export class StopTime {
    constructor(
        public stopHeadsign?: string,
        public arrivalTime?: number,
        public departureTime?: number,
        public predictedArrivalTime?: number,
        public predictedDepartureTime?: number,
        public tripId?: string,
        public serviceDate?: Date,
        public wheelchairAccessible?: boolean,
        public groupIds?: string[]
    ) { }
}

export interface IDirection {
    diretionId?: number;
    stopTimes?: IStopTime[];
}

export class Direction implements IDirection {
    constructor(
        public diretionId?: number,
        public stopTimes?: IStopTime[]
    ) {}

    static createFromInterface(val: IDirection): Direction {
        return new Direction(val.diretionId, val.stopTimes);
    }
}

export interface ISchedule {
    routeId?: string;
    directions?: IDirection[];
}

export class Schedule implements ISchedule {
    constructor(
        public routeId?: string,
        public directions?: IDirection[]
    ) {}

    static createFromInterface(val: ISchedule): Schedule {
        return new Schedule(val.routeId, val.directions.map(d => Direction.createFromInterface(d)));
    }
}

export interface IScheduleForStopEntry {
    stopId?: string;
    serviceDate?: string;
    routeIds?: string[];
    alertIds?: string[];
    schedules?: ISchedule[];
}

export class ScheduleForStopEntry implements IScheduleForStopEntry {
    constructor (
        public stopId?: string,
        public serviceDate?: string,
        public routeIds?: string[],
        public alertIds?: string[],
        public schedules?: ISchedule[]
    ) {}

    public static reducedSchedules(scheduleForStopEntry: IScheduleForStopEntry): IScheduleForStopEntry {
        scheduleForStopEntry.schedules = scheduleForStopEntry.schedules.map(s => Schedule.createFromInterface(s));
        return scheduleForStopEntry;
    }
}

export interface IScheduleForStopResponse {
    data: {
        entry: IScheduleForStopEntry
    };
}
