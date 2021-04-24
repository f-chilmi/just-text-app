export class Chat {
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