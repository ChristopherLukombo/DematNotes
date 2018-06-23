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
    document: Document;

    constructor(
        private principal: Principal,
        private services: Services,
        private documentService: DocumentService,
    ) {}

    ngOnInit() {
        this.loadCurrentUser();
    }

    /**
     * Load Current User logged in
     */
    private loadCurrentUser(): void {
        this.principal.identity().then((currentUser) => {
            this.currentUser = currentUser;
            this.getFiles();
        });
    }

    selectFile(event): void {
        this.selectedFile = event.target.files;
    }

    upload(): void {
        this.currentFileUpload = this.selectedFile.item(0);
        this.progress.percentage = 0;

        this.services.uploadPicture(this.currentFileUpload, this.currentUser.id)
            .subscribe((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    console.log('File is completely uploaded!');
                    this.getFiles();
                }
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });

        this.selectedFile = undefined;
    }

    private getFiles() {
        this.services.getDocuments(this.currentUser.id)
            .subscribe((documents) => {
                console.log(documents);
                this.documents = documents;
            });
    }

    /**
     * Download a document based on its id
     * @param idDocument
     */
    public downloadDocument(idDocument): void {
        this.documentService.find(idDocument)
            .subscribe((document) => {
                this.document = document.body;
                this.executeDownload();
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    private executeDownload(): void {
        this.services.downloadDocument(this.document.id)
            .subscribe((response) => {
                saveAs(response, this.document.entitled);
            }, (error) => {
                console.log(JSON.parse(error.body).message);
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
