import { Document, Model } from 'mongoose';
import { DeepPartial } from './../types/deep-partial.type';
export declare abstract class CRUDService<T extends Document> {
    private readonly model;
    private readonly modelName;
    constructor(model: Model<T>);
    findOne(conditions: Partial<Record<keyof T, unknown>>, projection?: string | Record<string, unknown>, options?: Record<string, unknown>): Promise<T | null>;
    getAllDocuments(): Promise<T[]>;
    getDocumentsCount(): Promise<number>;
    getDocumentById(id: string): Promise<T>;
    createDocument(data: Omit<T, keyof Document>): Promise<T>;
    removeDocumentById(id: string): Promise<any>;
    updateDocumentById(id: string, newData: DeepPartial<T>): Promise<T>;
}
