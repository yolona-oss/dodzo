export interface LimitedOutput<T> {
    data: T[],
    limit: number,
    offset: number
}
