export function writeTextFile(path: string, data: object): boolean {
    try {
        Deno.writeTextFileSync(path, JSON.stringify(data));
        return true;
    } catch (error) {
        return false;
    }
}

export async function readTextFile(path: string): Promise<String | null> {
    try {
        const result = await Deno.readTextFile(path);
        return result;
    } catch (error) {
        return null;
    }
}

export function makeDirectory(path: string) {
    try {
        Deno.mkdirSync(path);
        return true;
    } catch (error) {
        return false;
    }
}

export function readDirectory(path: string) {
    try {
        Deno.readDir(path);
        return true;
    } catch (error) {
        return false;
    }
}
