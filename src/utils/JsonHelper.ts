
import fs from 'fs';

export class JsonHelper {
    static readJson(filePath: string): Record<string, string>[] {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    //generic typed read: const data = JsonHelper.readJsonAs<MyType[]>('data/file.json');
    static readJsonAs<T>(filePath: string): T {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
}