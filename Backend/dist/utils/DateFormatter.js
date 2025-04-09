"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToMySQLDate = void 0;
const date_fns_1 = require("date-fns");
/*
    ~ Función para formatear fechas...
    + Esta función se encarga de darle formato correcto a fechas estandar
    + del tipo "DD/MM/YYYY" (español - latino) al formato "yyyy-MM-dd" el
    + cual es el formato con que se almacena en una BD MySQL...
*/
// const convertToMySQLDate = (
//     inputDate: string,
// ): string | null => {
//     try {
//         // * Parsear la fecha en formato DD/MM/YYYY...
//         const parsedDate = parse(
//             inputDate,
//             'dd/MM/yyyy',
//             new Date(),
//         );
//         // * Vericar si la fecha es válida...
//         if (!isValid(parsedDate)) {
//             throw new Error('Invalid date...!');
//         }
//         // * Formatear para MySQL ('YYYY/MM/DD')...
//         return format(parsedDate, 'yyyy-MM-dd');
//     } catch (error) {
//         console.error(
//             'Error en conversión de fecha:',
//             error,
//         );
//         return null;
//     }
// };
const convertToMySQLDate = (inputDate) => {
    try {
        console.log('Formato de Fecha enviado desde el Frontend: ', inputDate);
        let parsedDate;
        // *Intenta parsear como 'dd-MM-yyyy' (formato español/latino)
        parsedDate = (0, date_fns_1.parse)(inputDate, 'dd-MM-yyyy', new Date());
        if (!(0, date_fns_1.isValid)(parsedDate)) {
            // *Si falla, intenta parsear como 'yyyy-MM-dd' (formato MySQL)
            parsedDate = (0, date_fns_1.parse)(inputDate, 'yyyy-MM-dd', new Date());
            if (!(0, date_fns_1.isValid)(parsedDate)) {
                throw new Error('Invalid date format. Expected "dd-MM-yyyy" or "yyyy-MM-dd"...!');
            }
        }
        return (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
    }
    catch (error) {
        console.error('Error en conversión de fecha:', error);
        return null;
    }
};
exports.convertToMySQLDate = convertToMySQLDate;
//# sourceMappingURL=DateFormatter.js.map