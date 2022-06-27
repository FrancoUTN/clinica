import { Usuario } from "./Usuario";

export interface Turno {
    idEsp: string;
    idPac: string;
    especialista: Usuario;
    paciente: Usuario;
    fecha: Date;
    especialidad: string;
    estado: string;
    reviewEsp: string;
    reviewPac: string;
}