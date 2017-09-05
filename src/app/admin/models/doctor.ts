/*
CR: Jeśli nie planujesz dodać żadnych metod do klasy Doctor,
    to chyba lepiej będzie zrobić analogicznie jak w przypadku pacjenta interface zamiast klasy
*/
export class Doctor {
    id: number;
    name: string;
    surname: string;
    specs: string[];
    cities: string[]

    constructor(id: number, name: string, surname: string, spec: string[], city: string[]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.specs = spec;
        this.cities = city;
        console.log("Wywolano konstruktor klasy Doctor");
    }
}
