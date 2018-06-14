import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {MarksService} from '../marks/marks.service';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {Evaluation, EvaluationService} from '../entities/evaluation';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'jhi-results',
    templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
    currentUser: any;

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;

    marks: string[] = Array<string>(this.users.length);
    comments: string[] = Array<string>(this.users.length);
    coefficients: string[] = Array<string>(this.users.length);

    constructor(
        private principal: Principal,
        private marksService: MarksService,
        private evaluationService: EvaluationService,
        public dialog: MatDialog
    ) {}

    onChartClick(event) {
        console.log(event);
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.marksService.getSchoolsByCurrentUserTeacher(account.id)
                .subscribe(
                    (schools) => {
                        this.schools = schools;
                    }, (error) => {
                        console.log(JSON.parse(error.body).message);
                    });
        });
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(this.currentUser.id, this.schoolSelected)
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
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected
        )
            .subscribe(
                (users) => {
                    this.users = users;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.marksService.getStudentUserByIdUser(this.userSelected)
            .subscribe(
                (user) => {
                    this.users = new Array<User>();
                    this.users.push(user);
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    saveMark() {
        for (let i = 0; i < this.marks.length; i++) {
            if (this.marks[i] !== undefined && this.coefficients[i] !== undefined) {
                if (!this.isNumber(this.marks[i].trim())) {
                    alert('Saisir une moyenne valide');
                    return;
                } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
                    alert('Saisir une moyenne entre 0 et 20');
                    return;
                } else if (!this.isNumber(this.coefficients[i].trim())) {
                    alert('Saisir un coefficient valide');
                    return;
                } else if (parseFloat(this.coefficients[i].trim()) < 0 || parseFloat(this.coefficients[i].trim()) > 15) {
                    alert('Saisir un coefficient entre 0 et 15');
                    return;
                } else  {
                    this.marksService.getStudentByIdUser(i).subscribe(
                        (student) => {
                            const e = new Evaluation(
                                null,
                                parseFloat(this.marks[i].trim()),
                                new Date().toISOString().slice(0, 16),
                                this.comments[i].trim(),
                                null,
                                null,
                                student.id,
                                null,
                                null
                            );

                            this.evaluationService.create(
                                e
                            ).subscribe(
                                (evaluation) => {
                                    if (i === this.marks.length - 1 && evaluation) {
                                        alert('Moyenne enregistré' + evaluation);
                                    }
                                }, (secondError) => {
                                    console.log(JSON.parse(secondError.body).message);
                                });
                        }, (error) => {
                            console.log(JSON.parse(error.body).message);
                        });
                }
            }
        }
    }

    isNumber(value: string) {
        let valid = true;
        try {
            parseFloat(value);
        } catch (error) {
            valid = false;
        }
        return valid;
    }

}
