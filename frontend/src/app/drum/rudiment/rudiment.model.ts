
export class Rudiment {
    private _id: string;

    constructor(private _name: string) {
    }

    get name(): string {
        return this._name;
    }

    static fromJSON(json: any): Rudiment{
        const rudiment = new Rudiment(json.name);
        rudiment._id = json._id;
        return rudiment;
    }

    public toJSON(): any {
        return {
            name: this._name
        }
    }

    get id(): string {
        return this._id;
    }
}