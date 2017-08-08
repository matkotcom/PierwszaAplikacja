export class Doctor {
    id: number;
    name: string;
    surname: string;
    spec: string[];

    constructor(id: number, name: string, surname: string, spec: string[]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.spec = spec;
        console.log("Wywolano konstruktor klasy Doctor");
    }
}