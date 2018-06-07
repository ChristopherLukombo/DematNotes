import {Component, OnInit} from '@angular/core';
import { Account, LoginModalService, Principal } from '../shared';
import {MarksService} from './marks.service';
import {User} from '../shared/user/user.model';
import { SchoolMySuffix } from '../entities/school-my-suffix';
import { ClassroomMySuffix } from '../entities/classroom-my-suffix';
import { ARIA_DESCRIBER_PROVIDER } from '@angular/cdk/a11y';
import { EvaluationMySuffix, EvaluationMySuffixService } from '../entities/evaluation-my-suffix';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    currentUser: any;
    currentUserReport: any;

    schools: SchoolMySuffix[] = Array<SchoolMySuffix>();
    classrooms: ClassroomMySuffix[] = Array<ClassroomMySuffix>();
    users: User[] = Array<User>();

    schoolsReport: SchoolMySuffix[] = Array<SchoolMySuffix>();
    classroomsReport: ClassroomMySuffix[] = Array<ClassroomMySuffix>();
    usersReport: User[] = Array<User>();

    schoolSelected;
    classroomSelected;
    userSelected;

    schoolSelectedReport;
    classroomSelectedReport;
    userSelectedReport;

    marks: string[] = Array<string>(this.users.length);
    comments: string[] = Array<string>(this.users.length);
    coefficients: string[] = Array<string>(this.users.length);

    marksReport: string[] = Array<string>(this.usersReport.length);
    commentsReport: string[] = Array<string>(this.usersReport.length);
    coefficientsReport: string[] = Array<string>(this.usersReport.length);

    chartOptions = {
        responsive: true
    };

    // chartData = [
    //     { data: [330, 600, 260, 700], label: 'Account A' },
    //     { data: [120, 455, 100, 340], label: 'Account B' },
    //     { data: [45, 67, 800, 500], label: 'Account C' }
    // ];

  chartData = [
    {
      label: '',
      data: [],
    }
   ];

    // chartLabels = ['January', 'February', 'Mars', 'April'];

    constructor(private principal: Principal,
                private marksService: MarksService,
                private evaluationService: EvaluationMySuffixService,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    ) {
        // Chargement des icônes cryptées
        iconRegistry.addSvgIcon(
            'printer',
            sanitizer.bypassSecurityTrustResourceUrl('content/c11b97db8f0e59c9940351c914c4bec9.svg'));
        iconRegistry.addSvgIcon(
            'upload',
            sanitizer.bypassSecurityTrustResourceUrl('content/4d599ba6bf2eb50c397d5aefd3b20e00.svg'));
    }

    onChartClick(event) {
        console.log(event);
    }

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadCurrentUserReport();
        this.loadChartData();
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.marksService.getSchoolsByCurrentUserTeacher(account.id)
            .subscribe(
                (result) => {
                    this.schools = result.body;
            }, (error) => {
                console.log('There is an error' + error);
            });
        });
    }

    private loadCurrentUserReport(): void {
        this.principal.identity().then((account) => {
            this.currentUserReport = account;
            this.marksService.getSchoolsByCurrentUserTeacher(account.id)
            .subscribe(
                (result) => {
                    this.schoolsReport = result.body;
            }, (error) => {
                console.log('There is an error' + error);
            });
        });
    }

    private loadChartData(): void {
        this.marksService.getData(1101, 1301).subscribe(
            (response) => {
                // this.chartData = response;
                this.chartData = response as any [];
            }, (err) => {
                console.log('There is an error' + err);
            }
        );
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(this.currentUser.id, this.schoolSelected)
        .subscribe(
              (result) => {
                this.userSelected = undefined;
                this.classroomSelected = undefined;
                 this.classrooms = result.body;
              }, (error) => {
                 console.log('There is an error' + error);
        });
    }

    getClassroomsByCurrentUserTeacherReport(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(this.currentUserReport.id, this.schoolSelectedReport)
        .subscribe(
              (result) => {
                this.userSelectedReport = undefined;
                this.classroomSelectedReport = undefined;
                 this.classroomsReport = result.body;
              }, (error) => {
                 console.log('There is an error' + error);
        });
    }

    getStudentsUserByCurrentUserTeacher(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(this.currentUser.id, this.schoolSelected, this.classroomSelected)
        .subscribe(
            (result) => {
                this.users = result.body;
             }, (error) => {
                console.log('There is an error' + error);
        });
    }

    getStudentsUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(this.currentUserReport.id, this.schoolSelectedReport, this.classroomSelectedReport)
        .subscribe(
            (result) => {
                this.usersReport = result.body;
             }, (error) => {
                console.log('There is an error' + error);
        });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.marksService.getStudentUserByIdUser(this.userSelected)
        .subscribe(
            (result) => {
                this.users = new Array<User>();
                this.users.push(result.body);
            }, (error) => {
                console.log('There is an error' + error);
            });
    }

    getStudentUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentUserByIdUser(this.userSelected)
        .subscribe(
            (result) => {
                this.usersReport = new Array<User>();
                this.usersReport.push(result.body);
            }, (error) => {
                console.log('There is an error' + error);
            });
    }

    saveMark() {
        for (let i = 0; i < this.marks.length; i++) {
            if (this.marks[i] !== undefined && this.coefficients[i] !== undefined) {
                if (!this.tryParseFloat(this.marks[i].trim())) {
                    alert('Saisir une moyenne valide');
                    return;
                } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
                    alert('Saisir une moyenne entre 0 et 20');
                    return;
                } else if (!this.tryParseFloat(this.coefficients[i].trim())) {
                    alert('Saisir un coefficient valide');
                    return;
                } else if (parseFloat(this.coefficients[i].trim()) < 0 || parseFloat(this.coefficients[i].trim()) > 15) {
                    alert('Saisir un coefficient entre 0 et 15');
                    return;
                } else  {
                    this.marksService.getStudentByIdUser(i)
                    .subscribe(
                        (result) => {
                            const evaluation = new EvaluationMySuffix( null,
                                parseFloat(this.marks[i].trim()),
                                parseFloat(this.coefficients[i].trim()),
                                new Date().toISOString().slice(0, 16),
                                this.comments[i].trim(),
                                null,
                                result.body.id,
                                null);
                            this.evaluationService.create(evaluation)
                            .subscribe(
                                (result1) => {
                                    if (i === this.marks.length - 1) {
                                        alert('Moyenne enregistré');
                                    }
                            }, (error1) => {
                               console.log('There is an error' + error1);
                            });
                        }, (error) => {
                            console.log('There is an error' + error);
                    });
                }
            }
        }
    }

    tryParseFloat(value: string) {
        let valid = true;
        try {
            parseFloat(value);
        } catch (error) {
            valid = false;
        }
        return valid;
    }
}
