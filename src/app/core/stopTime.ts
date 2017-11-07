interface IStopTime {
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

class StopTime {
    constructor(
        stopHeadsign?: string,
        arrivalTime?: number,
        departureTime?: number,
        predictedArrivalTime?: number,
        predictedDepartureTime?: number,
        tripId?: string,
        serviceDate?: Date,
        wheelchairAccessible?: boolean,
        groupIds?: string[]
    ) { }
}
