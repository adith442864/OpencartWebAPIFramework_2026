import XLSX, { WorkBook } from 'xlsx';

export class ExcelHelper {

    static readExcel(filePath: string, sheetName: string): Record<string, string>[] {
        const workbook:WorkBook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
    }

}