import { unlinkSync } from "fs";
import { ImageUploadStrategy } from "../../misc/image-upload-strategy";

export class LocalUploadStrategy extends ImageUploadStrategy {
    constructor() {
        super("local")
    }

    async uploadFile(file: Express.Multer.File) {
        return {
            target: file.path,
            uploader: this.apiName,
            uploaderData: {
                localPath: file.path
            }
        }
    }

    async destroyFile(uploaderData: any) {
        let e = undefined
        try {
            unlinkSync(uploaderData.localPath)
        } catch(_e: any) {
            e = JSON.stringify(_e)
        }
        return {
            target: uploaderData.localPath,
            uploader: this.apiName,
            error: e
        }
    }
}
