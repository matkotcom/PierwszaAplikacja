import { Doctor } from './admin/models/doctor';

export const doctorsTab: Doctor[] = [
    {
      id: 1,
      name: "Jan",
      surname: "Zabrocki",
      spec: ["Okulista", "Laryngolog", "Dietetyk"],
      city: ["Wroclaw", "Legnica"]
    },
    new Doctor(2, "Arek", "Barycki", ["Okulista", "Weterynarz"], ["Warszawa"]),
    new Doctor(3, "Arek", "Baryckizxc", ["Okulista", "Weterynarz"], ["Warszawa"]),
    new Doctor(4, "Mock", "Nadworny", ["Lekarz", "Ortopeda", "Pediatra"], ["Warszawa", "Poznan"]),
    new Doctor(5, "Tadeusz", "Wawrzyn", ["Dentysta"], ["Poznan", "Rzeszow"]),
    new Doctor(6, "Test", "Ajakis", ["Dentysta"], ["Krakow"])
  ];
