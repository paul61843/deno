export function writeJson(path: string, data: object): boolean {
    try {
        Deno.writeTextFileSync(path, JSON.stringify(data));
        return true;
    } catch (error) {
        return false;
    }
}

export async function readJson(path: string): Promise<String | null> {
    try {
        const result = await Deno.readTextFile(path);
        return result;
    } catch (error) {
        return null;
    }
}