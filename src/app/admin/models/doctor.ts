export class Doctor {
    id: string;
    name: string;
    surname: string;
    specs: string[];
    cities: string[]

    constructor(id: string, name: string, surname: string, spec: string[], city: string[]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.specs = spec;
        this.cities = city;
        console.log("Wywolano konstruktor klasy Doctor");
    }
}
