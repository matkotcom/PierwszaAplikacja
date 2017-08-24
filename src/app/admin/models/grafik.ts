export class Grafik {
    data: string
    start: string;
    stop: string;
    wolny: boolean;
    pacjent: string;
    powod: string;
    idLekarza: number;
    id: number;

    constructor(data: string, start: string, stop: string, wolny: boolean, pacjent: string, powod: string, idlekarza:number, id: number) {
        this.data = data;
        this.start = start;
        this.stop = stop;
        this.wolny = wolny;
        this.pacjent = pacjent;
        this.powod = powod;
        this.idLekarza = idlekarza;
        this.id = id;
        console.log("Wywolano konstruktor klasy Grafik");
    }
}
