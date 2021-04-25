export class ListMessage {
    created_at: string;
    users_info: [];
    _id: string;

    constructor (created_at: string, users_info: [], _id: string) {
        this.created_at = created_at;
        this.users_info = users_info;
        this._id = _id;
    }
}