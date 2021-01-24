import Client from "./client";
import subType from "./subType";

export default interface Subscription {
    _id: string,
    client: Client
    subInfo: subType,
    dateFrom: Date,
    dateTo: Date,
    isInfinite: boolean,
    visitsLeft: number
}
