export enum SoundTypes {
    Click,
    Snare,
    Kick,
    Clap
}

export class Metronome {
    private _id: string;
    private _tempo: number;
    private _type: SoundTypes;
    private _interval: NodeJS.Timer;
    private _tracking: boolean;

    constructor() {
        this._tempo = 90;
        this._type = SoundTypes.Click;
    }

    get tracking(): boolean{
        return this._tracking;
    }

    set tracking(value: boolean){
        this._tracking = value;
    }

    get id(): string {
        return this._id;
    }

    get tempo(): number {
        return this._tempo;
    }

    set tempo(value: number) {
        this._tempo = value;
    }

    get interval(): NodeJS.Timer {
        return this._interval;
    }

    get type(): SoundTypes {
        return this._type;
    }

    set type(value: SoundTypes) {
        this._type = value;
    }

    play(): void {
        this.stop();
        this._interval = setInterval(() => this.tick(), 60 / this._tempo * 1000);
    }

    stop(): void {
        clearInterval(this._interval);
    }

    private tick(): void {
        const audio = new Audio(`../../../assets/${this._type.toString()}.m4a`);
        audio.play();
    }

    toJSON() {
        return {
            _id: this._id,
            tempo: this._tempo,
            type: this._type,
        }
    }

    static fromJSON(json: any): Metronome {
        const metronome = new Metronome();
        metronome._id = json._id
        metronome.tempo = json.tempo;
        metronome.type = json.type;
        return metronome;
    }

}