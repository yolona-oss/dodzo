export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare function extractFileName(filePath: string, removeExtension?: boolean): string;
export declare const generateRandom: () => string;
export declare function extractValueFromObject(obj: object, path: string): any;
export declare function assignToCustomPath(obj: any, propPath: string, value: any): object;
export declare const isUndefined: (value: unknown) => value is undefined;
export declare const isNull: (value: unknown) => value is null;
export declare function normalizeName(title: string): string;
export declare function timeout<T>(task: () => Promise<T>, timeout: number): Promise<T>;
export declare function retrier<T>(fn: () => Promise<T>, opts?: {
    tries?: number;
    wait?: number;
    timeout?: number;
}): Promise<T>;
