import { format, parseISO } from 'date-fns';

export function convertirFecha(fecha: Date): string {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd\'T\'HH:mm:ss');
    return fechaFormateada;
}

export function convertirFechaString(fecha: string): string {
    const fechaParseada = parseISO(fecha);
    const fechaFormateada = format(fecha, 'yyyy-MM-dd HH:mm:ss');
    return fechaFormateada;
}
