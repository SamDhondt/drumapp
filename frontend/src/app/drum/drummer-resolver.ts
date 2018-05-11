import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Drummer } from "./drummer/drummer.model";
import { Observable } from "rxjs/Observable";
import { DrumDataService } from "./drum-data.service";

@Injectable()
export class DrummerResolver implements Resolve<Drummer> {
    constructor(private _drumDataService: DrumDataService){

    }

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<Drummer> {
        return this._drumDataService.getDrummer(route.params["id"]);
    }
}