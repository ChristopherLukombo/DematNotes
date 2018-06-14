import {Component, OnInit} from '@angular/core';
import {FileUploaderService} from './FileUploaderService';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MarksService} from '../marks/marks.service';
import {Principal} from '../shared';
import {Document} from '../entities/document';

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
            this.progress.percentage = 0;
            this.currentFileUpload = this.selectedFiles.item(0);

            this.currentUser = account;

            this.marksService.getStudentByIdUser(account.id).subscribe((student) => {

                this.fileUploader.uploadImage(this.currentFileUpload, (student != null) ? student.id : 1).
                subscribe((event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress.percentage = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                    }
                });

                this.selectedFiles = undefined;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    refresh() {
        this.getFiles();
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

}
