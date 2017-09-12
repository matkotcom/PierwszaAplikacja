export class TerminZLekarzem {
    data: string
    start: string;
    stop: string;
    wolny: boolean;
    id: number;
    idLekarza: string;
    name: string;
    surname: string;
    specs: string[];
    miasto: string;

    constructor(data?: string, start?: string, stop?: string, wolny?: boolean, id?: number, idLekarza?: string, name?: string, surname?: string, specs?: string[], miasto?: string) {
        this.data = data || '';
        this.start = start || '';
        this.stop = stop || '';
        this.wolny = wolny || true;
        this.id = id || 0;
        this.idLekarza = idLekarza || "0";
        this.name = name || '';
        this.surname = surname || '';
        this.specs = specs || [];
        this.miasto = miasto || '';

        console.log("Wywolano konstruktor klasy TerminZLekarzem");
    }


    


}