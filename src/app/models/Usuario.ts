import { HistoriaClinica } from "./HistoriaClinica";

export interface Usuario {
    'nombre': string;
    'apellido': string;
    'edad': number;
    'dni': number;
    'email': string;
    'rol': string;

    'obraSocial'?: string; // paciente
    'fotos'?: string[]; // paciente
    // 'historiaClinica'?: HistoriaClinica; // paciente
    'historiaClinica'?: any; // paciente
    'especialidades'?: string[]; // especialista
    'habilitado'?: boolean; // especialista
    'agenda'?: boolean[]; // especialista
    'foto'?: string; // especialista y administrador
}