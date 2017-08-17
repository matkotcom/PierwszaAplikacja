import { Doctor } from './admin/models/doctor';

export const doctorsTab: Doctor[] = [
    {
      id: 1,
      name: "Jan",
      surname: "Nowak",
      spec: ["Okulista", "Laryngolog", "Dietetyk"]
    },
    new Doctor(2, "Test", "Wawrzyn", ["Dentysta"]),
    new Doctor(3, "Mock", "Nadworny", ["Lekarz", "Ortopeda", "Pediatra"]),
    new Doctor(4, "Doctor", "Gawedziarz", ["Okulista", "Weterynarz"])
  ];