import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {MatIconRegistry} from '@angular/material';
import {saveAs} from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';
import {Services} from '../services';

@Component({
    selector: 'jhi-school-reports',
    templateUrl: './school-reports.component.html'
})
export class SchoolReportsComponent implements OnInit {
    currentUser: any;

    schools: School[] = Array<School>();
    classrooms: Classroom[] = Array<Classroom>();
    users: User[] = Array<User>();

    schoolSelected;
    classroomSelected;
    userSelected;

    constructor(
        private principal: Principal,
        private services: Services,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
    ) {

        // Loading of encrypted icon
        this.iconRegistry.addSvgIcon(
            'download',
            this.sanitizer.bypassSecurityTrustResourceUrl('content/2a7860b62b7f5e43cbf9a4a7d56ed91c.svg'));
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.services.getSchoolsByTeacher(account.id)
                .subscribe(
                    (schools) => {
                        this.schools = schools;
                    }, (error) => {
                        console.log(JSON.parse(error.body).message);
                    });
        });
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.services.getClassroomsByTeacher(this.currentUser.id, this.schoolSelected)
            .subscribe(
                (classrooms) => {
                    this.userSelected = undefined;
                    this.classroomSelected = undefined;
                    this.classrooms = classrooms;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    getStudentsUserByCurrentUserTeacher(): void {
        this.services.getStudentsByTeacher(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .subscribe(
                (users) => {
                    this.users = users;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.services.getStudentUserByIdUser(this.userSelected)
            .subscribe(
                (users) => {
                    this.users = [];
                    this.users.push(users);
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    // saveMark() {
    //     for (let i = 0; i < this.marks.length; i++) {
    //         if (undefined !== this.marks[i]  && undefined !== this.coefficients[i]) {
    //             if (!this.isNumber(this.marks[i].trim())) {
    //                 alert('Saisir une moyenne valide');
    //                 return;
    //             } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
    //                 alert('Saisir une moyenne entre 0 et 20');
    //                 return;
    //             } else if (!this.isNumber(this.coefficients[i].trim())) {
    //                 alert('Saisir un coefficient valide');
    //                 return;
    //             } else if (parseFloat(this.coefficients[i].trim()) < 0 || parseFloat(this.coefficients[i].trim()) > 15) {
    //                 alert('Saisir un coefficient entre 0 et 15');
    //                 return;
    //             } else  {
    //                 this.services.getStudentByIdUser(i).subscribe(
    //                     (student) => {
    //                         const e = new Evaluation(
    //                             null,
    //                             parseFloat(this.marks[i].trim()),
    //                             new Date().toISOString().slice(0, 16),
    //                             this.comments[i].trim(),
    //                             null,
    //                             null,
    //                             student.id,
    //                             null,
    //                             null
    //                         );
    //
    //                         this.evaluationService.create(e)
    //                             .subscribe(
    //                                 (evaluation) => {
    //                                     if (i === this.marks.length - 1 && evaluation) {
    //                                         alert('Moyenne enregistré');
    //                                     }
    //                                 }, (firstError) => {
    //                                     console.log(JSON.parse(firstError.body).message);
    //                                 });
    //                     }, (secondError) => {
    //                         console.log(JSON.parse(secondError.body).message);
    //                     });
    //             }
    //         }
    //     }
    // }

    // isNumber(value: string) {
    //     let valid = true;
    //     try {
    //         parseFloat(value);
    //     } catch (error) {
    //         valid = false;
    //     }
    //     return valid;
    // }

    downloadSchoolReport() {
        this.services.downloadSchoolReport().subscribe((response) => {
            saveAs(response, 'bulletin');
        }, (error) =>  {
            console.log(error);
        });
    }
}
