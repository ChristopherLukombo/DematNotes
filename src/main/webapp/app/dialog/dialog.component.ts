import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Principal} from '../shared';
import {Document, DocumentService} from '../entities/document';
import {saveAs} from 'file-saver';
import {Services} from '../services';

@Component({
    selector: 'jhi-dialog',
    templateUrl: './dialog.component.html',

})
export class DialogComponent implements OnInit {
    currentUser: any;

    selectedFile: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = {percentage: 0};

    documents: Document[] = [];

    constructor(
        private principal: Principal,
        private services: Services,
        private documentService: DocumentService,
    ) {}

    ngOnInit() {
        this.loadCurrentUser();
        this.getFiles();
    }

    /**
     * Load Current User logged in
     */
    private loadCurrentUser(): void {
        this.principal.identity().then((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    selectFile(event): void {
        this.selectedFile = event.target.files;
    }

    upload(): void {
        this.currentFileUpload = this.selectedFile.item(0);
        this.progress.percentage = 0;

        this.services.getStudentByIdUser(this.currentUser.id)
            .subscribe((student) => {
                this.services.uploadPicture(this.currentFileUpload, student.id)
                    .subscribe((event) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            this.progress.percentage = Math.round(100 * event.loaded / event.total);
                        } else if (event instanceof HttpResponse) {
                            console.log('File is completely uploaded!');
                            this.getFiles();
                        }
                    });

                this.selectedFile = undefined;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    private getFiles() {
        this.principal.identity()
            .then((account) => {
                this.services.getStudentByIdUser(account.id).subscribe((student) => {
                    this.services.getDocuments(student.id).subscribe((documents) => {
                        console.log(documents);
                        this.documents = documents;
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
        this.documentService.find(idDocument)
            .subscribe((document) => {
                this.services.downloadDocument(idDocument).subscribe((response) => {
                    console.log(response);
                    saveAs(response, document.body.entitled);
                }, (secondError) => {
                    console.log(JSON.parse(secondError.body).message);
                });
            }, (firstError) => {
                console.log(JSON.parse(firstError.body).message);
            });
    }

    public deleteDocument(idDocument) {
        this.services.deleteDocument(idDocument)
            .subscribe((response) => {
                console.log(response);
                this.getFiles();
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

}
