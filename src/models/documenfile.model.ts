export class DocumentFile {
    file: File;
    error: string;

    constructor(file: File, error: string) {
        this.file = file;
        this.error = error;
    }    
}