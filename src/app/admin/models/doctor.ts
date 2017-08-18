export class Doctor {
    id: number;
    name: string;
    surname: string;
    spec: string[];
    city: string[]

    constructor(id: number, name: string, surname: string, spec: string[], city: string[]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.spec = spec;
        this.city = city;
        console.log("Wywolano konstruktor klasy Doctor");
    }
}
