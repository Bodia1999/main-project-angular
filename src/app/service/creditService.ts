import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CreditService {
    message: object;
    private messageSource = new BehaviorSubject<object>(this.message);
    currentMessage = this.messageSource.asObservable();
    constructor() {

    }
    changeMessage(message: object) {
        this.messageSource.next(message);
    }
}