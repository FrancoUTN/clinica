export interface Usuario {
    'nombre': string;
    'apellido': string;
    'edad': number;
    'dni': number;
    'email': string;
    'rol': string;

    'obraSocial'?: string; // paciente
    'fotos'?: string[]; // paciente
    'especialidades'?: string[]; // especialista
    'habilitado'?: boolean; // especialista
    'foto'?: string; // especialista y administrador
}