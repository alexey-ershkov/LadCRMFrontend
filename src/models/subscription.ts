import Client from "./client";
import subType from "./subType";

export default interface Subscription {
    _id: string,
    client: Client,
    subInfo: subType,
    uuid: number
    dateFrom: Date,
    dateTo: Date,
    isArchived: boolean,
    isInfinite: boolean,
    visitsLeft?: number,
    lastVisited?: Date
}
