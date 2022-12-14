import Notification from "../@shared/notification/notification";

export default abstract class Entity{
    protected _id: string;
    protected notification: Notification;

    protected constructor() {
        this.notification = new Notification();
    }

    get id(){
        return this._id;
    }

}