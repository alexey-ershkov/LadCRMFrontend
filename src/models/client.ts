export default interface Client {
    _id: string,
    name:string;
    surname: string;
    lastName: string;
    dateOfBirth: Date;
    isChild: boolean,
    parentName?:string;
    parentSurname?: string;
    parentLastName?: string;
    parentDateOfBirth?: Date;
    phone: string;
    orderNumber: number;
    created: Date;
}
