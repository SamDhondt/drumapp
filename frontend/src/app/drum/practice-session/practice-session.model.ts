import { Rudiment } from "../rudiment/rudiment.model";

export class PracticeSession {
    private _id: string;

    constructor(private _rudiment: Rudiment, 
                private _tempo: number, 
                private _start: Date, 
                private _end: Date) {
        
    }

    public get tempo() : number {
        return this._tempo;
    }
    
    public get rudiment() : Rudiment {
        return this._rudiment;
    }

    
    public get start() : Date {
        return this._start;
    }

    public get end() : Date {
        return this._end;
    }

    
    public get id() : string {
        return this._id;
    }

    get duration(){
        return new Date(this._end.valueOf() - this._start.valueOf());
      }
    

    public static fromJSON(json: any): PracticeSession {
        const ps = new PracticeSession(
            Rudiment.fromJSON(json.rudiment),
            json.tempo,
            new Date(json.start),
            new Date(json.end)
        );
        ps._id = json._id;
        return ps;
    }

    public toJSON(): any {
        return {
            _id: this._id,
            rudiment: this._rudiment.id,
            tempo: this._tempo,
            start: this._start,
            end: this._end
        }
    }
    
}