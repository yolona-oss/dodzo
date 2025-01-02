export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare function extractFileName(filePath: string, removeExtension?: boolean): string;
export declare const generateRandom: () => string;
export declare function extractValueFromObject(obj: object, path: string): any;
export declare function assignToCustomPath(obj: any, propPath: string, value: any): object;
