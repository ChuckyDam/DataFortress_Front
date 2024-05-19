import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class ErrorService {

    private _text = new BehaviorSubject<string>('');
    private _active = new BehaviorSubject<boolean>(false);

    text$ = this._text.asObservable();
    active$ = this._active.asObservable();

    setError(text: string){
        
        this._active.next(true);
        this._text.next(text);

    }
    closeError(){
        this._active.next(false);
    }


}