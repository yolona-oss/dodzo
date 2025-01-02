import * as crypto from 'crypto';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// TODO maybe URL
export function extractFileName(filePath: string, removeExtension: boolean = true) {
    const urlArr = filePath.split('/')
    const fullName = urlArr[urlArr.length - 1]
    let fileName = fullName
    if (removeExtension) {
        fileName = fullName.split('.')[0]
    }
    return fileName
}

export const generateRandom = () => Math.random().toString(36).substring(2, 15)

export function extractValueFromObject(obj: object, path: string): any {
    let ret: any = obj

    for (const node of path.split('.')) {
        ret = ret[node]
    }

    return ret
}

export function assignToCustomPath(obj: any, propPath: string, value: any): object {
    let paths = propPath.split(".")

    if (paths.length > 1) {
        var key = <any>(paths.shift())
        assignToCustomPath(
            obj[key] =
                Object.prototype.toString.call(obj[key]) === "[object Object]"
                    ? obj[key]
                    : {},
            paths.join('.'),
            value)
    } else {
        if (obj[paths[0]] === undefined) {
            obj[paths[0]] = value
        } else {
            Object.assign(obj[paths[0]], value)
        }
    }

    return obj
}

export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

export const isNull = (value: unknown): value is null => value === null;

export function formatName(title: string): string {
    return title
        .trim()
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ')
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
}
