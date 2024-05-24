import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class ErrorService {

    private _text = new BehaviorSubject<string>('');

    text$ = this._text.asObservable();

    setError(text: string){
        this._text.next(text);
    }
    closeError(){
        this._text.next("");
    }


}