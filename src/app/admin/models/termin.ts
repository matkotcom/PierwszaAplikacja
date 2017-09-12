export class Termin {
    data: string
    start: string;
    stop: string;
    wolny: boolean;
    pacjent: string;
    powod: string;
    idLekarza: string;
    id: number;
    miasto;

    constructor(data: string, start: string, stop: string, wolny: boolean, pacjent: string, powod: string, idlekarza:string, id: number, miasto: string) {
        this.data = data;
        this.start = start;
        this.stop = stop;
        this.wolny = wolny;
        this.pacjent = pacjent;
        this.powod = powod;
        this.idLekarza = idlekarza;
        this.id = id;
        this.miasto = miasto;
        console.log("Wywolano konstruktor klasy Termin");
    }
}
