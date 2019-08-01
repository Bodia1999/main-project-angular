import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    message = true;
    private messageSource = new BehaviorSubject<boolean>(this.message);
    currentMessage = this.messageSource.asObservable();
    constructor() {

    }
    changeMessage(message: boolean) {
        this.messageSource.next(message);
    }
}