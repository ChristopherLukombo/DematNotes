export class ChartData {
    private _data: Array<number>;
    private _label: string;

    constructor(data, label) {
        this._data = data;
        this._label = label;
    }

    get data(): Array<number> {
        return this._data;
    }

    set data(value: Array<number>) {
        this._data = value;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }

}
