export declare function sleep(ms: number): Promise<unknown>;
export declare function timeoutPromise(timeout: number): Promise<void>;
export declare function randSleep(max?: number, min?: number): Promise<unknown>;
export declare module time {
    type HMSTime = {
        hour: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    function add(time: Partial<HMSTime>, date?: Date): Date;
    function toDate(date: any): any;
    function isDate(date: any): boolean;
    function format(date: any, format: string): string;
    function rawMS(time: Partial<HMSTime>): number;
}
