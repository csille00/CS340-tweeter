export interface S3Dao {
    putImage(fileName: string, imageString: string): Promise<string>
}