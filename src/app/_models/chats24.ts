export class Chat {
    phone: string;
    message: string;

    constructor(message: string, phone: string) {
        this.phone = phone
        this.message = message;
    }
}