export class ChatMessage {
    // contact_id: string;
    // data: string;
    // from_user_id: string;
    // to_user_id: string;

    // constructor (contact_id: string, data: string, from_user_id: string, to_user_id: string) {
    //     this.contact_id = contact_id;
    //     this.data = data;
    //     this.from_user_id = from_user_id;
    //     this.to_user_id = to_user_id;
    // }

    contact_id: string;
    created_at: string;
    message: string;
    sender_id: string;

    constructor(contact_id: string, created_at: string, message: string, sender_id: string) {
        this.contact_id = contact_id;
        this.created_at = created_at;
        this.message = message;
        this.sender_id = sender_id
    }
}