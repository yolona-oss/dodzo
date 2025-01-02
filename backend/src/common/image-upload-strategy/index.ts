export interface ImageUploadApiResponse {
    target: string // url or path
    error?: string
}

export abstract class ImageUploadStrategy {
    constructor(public readonly apiName: string) {}

    abstract uploadFile(file: any): ImageUploadApiResponse;

    abstract destroyFile(file: any): ImageUploadApiResponse;
}
