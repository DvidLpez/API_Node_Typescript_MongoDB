
export interface FileUpload {
    name: string;
    data: any;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    // Mover subido de archivos
    mv: Function;
}