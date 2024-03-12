import { format } from 'date-fns';

export function convertirFecha(fecha: Date): string {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd\'T\'HH:mm:ss');
    return fechaFormateada;
}
