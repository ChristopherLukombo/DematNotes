import {Component, OnInit} from '@angular/core';
import {FileUploaderService} from './FileUploaderService';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MarksService} from '../marks/marks.service';
import {Principal} from '../shared';
import {Document, DocumentService} from '../entities/document';
import {saveAs} from 'file-saver';

@Component({
    selector: 'jhi-dialog',
    templateUrl: './dialog.component.html',
    styles: [`
        .spinner {
            visibility:hidden;
            position:absolute;
            margin-left:50%;
            margin-top:50%;
        }
    `]
})
export class DialogComponent implements OnInit {
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    currentUser: any;

    documents: Document[] = [];

    constructor(
        private principal: Principal,
        private fileUploader: FileUploaderService,
        private marksService: MarksService,
        private documentService: DocumentService
    ) { }

    ngOnInit() {
        this.getFiles();
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
        this.progress.percentage = 0;
    }

    upload() {
        this.principal.identity().then((account) => {
            this.currentFileUpload = this.selectedFiles.item(0);
            this.currentUser = account;
            console.log(this.currentFileUpload);
            if (! this.checkExtension(this.currentFileUpload)) {
                alert('Fichier non valide !');
            } else {
                this.progress.percentage = 0;
                this.marksService.getStudentByIdUser(account.id).subscribe((student) => {
                    this.fileUploader.uploadImage(this.currentFileUpload, (student != null) ? student.id : 1).
                    subscribe((event) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            this.progress.percentage = Math.round(100 * event.loaded / event.total);
                        } else if (event instanceof HttpResponse) {
                            this.getFiles();
                            console.log('File is completely uploaded!');
                        }
                    });

                    this.selectedFiles = undefined;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
            }
        });
    }

    private checkExtension(file: File): boolean {
        const extensions = ['image/jpeg', 'image/png', 'application/pdf'];
        console.log(file.type);
        return extensions.indexOf(file.type) !== -1;
    }

    private getFiles() {
        this.principal.identity().then((account) => {
            this.marksService.getStudentByIdUser(account.id).subscribe((student) => {
                this.fileUploader.getFiles(student.id).subscribe((documents) => {
                    this.documents = documents;
                    console.log(documents);
                });
            });
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    /**
     * Download a document based on its id
     * @param idDocument
     */
    public downloadDocument(idDocument) {
        this.documentService.find(idDocument).subscribe((document) => {
            this.fileUploader.downloadDocument(idDocument).subscribe((response) => {
                saveAs(response, document.body.entitled);
                console.log(response);
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        }, (firstError) => {
            console.log(JSON.parse(firstError.body).message);
        });
    }

    public deleteDocument(idDocument) {
        this.fileUploader.deleteFile(idDocument).subscribe((response) => {
            this.getFiles();
            console.log(response);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

}
