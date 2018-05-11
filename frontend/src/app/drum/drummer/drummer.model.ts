import { Rudiment } from "../rudiment/rudiment.model";
import { Metronome } from "../metronome/metronome.model";
import { PracticeSession } from "../practice-session/practice-session.model";

export class Drummer {
    private _currentRudiment: Rudiment;
    private _id: string;

    constructor(private _name: string, private _practiceSessions: PracticeSession[], private _metronome: Metronome) {
    }

    
    public get practiceSessions() : PracticeSession[] {
        return this._practiceSessions;
    }

    
    public set practiceSessions(ps : PracticeSession[]) {
        this._practiceSessions = ps;
    }
    
    

    static fromJSON(json: any): Drummer{
        if (json == null){
            return null;
        }
            
        const drum = new Drummer(
            json.name,
            (json.practiceSessions && json.practiceSessions.map(PracticeSession.fromJSON)) 
                || new Array<PracticeSession>(),
            Metronome.fromJSON(json.metronome),
        );
        drum._id = json._id;

        return drum;
    }

    toJSON(){
        return {
            name: this._name,
            practiceSessions: this._practiceSessions.map(ps => ps.toJSON()),
            metronome: this._metronome.toJSON(),
        }
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get practicedRudiments(): Rudiment[] {
        const ruds = new Array<Rudiment>();
        this._practiceSessions.forEach(s => {
            if (!ruds.some(r => r.name === s.rudiment.name)){
                ruds.push(s.rudiment);
            }
        });
        return ruds;
        
    }

    getPracticeSessionsByRudiment(rudiment: Rudiment): PracticeSession[]{
        return this._practiceSessions.filter(s => s.rudiment.name === rudiment.name);
    }

    
    public get practiceSessionsSelectedRudiment() : PracticeSession[] {
        return this.getPracticeSessionsByRudiment(this._currentRudiment);
    }

    get metronome(): Metronome {
        return this._metronome;
    }

    set metronome(value: Metronome) {
        this._metronome = value;
    }

    
    public get currentRudiment() : Rudiment {
        return this._currentRudiment;
    }

    
    public set currentRudiment(rudiment : Rudiment) {
        this._currentRudiment = rudiment;
    }
    
}