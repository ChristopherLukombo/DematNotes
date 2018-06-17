import {Component, Input, OnInit} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

import {AccountService, JhiLanguageHelper, Principal} from '../../shared';
import {SettingsService} from './settings.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];

    selectedFiles: FileList;
    currentFileUpload: File;
    @Input() image: String;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private settingsService: SettingsService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
        this.image = this.principal.getImageUrl();
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
                this.upload();
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        this.principal.identity().then((account) => {
            this.currentFileUpload = this.selectedFiles.item(0);
            if (! this.checkExtension(this.currentFileUpload)) {
                alert('File not valid !');
            } else {
                this.settingsService.uploadImage(this.currentFileUpload, (account != null) ? account.id : 1).
                subscribe((event) => {
                    if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                        this.image = this.principal.getImageUrl();
                    }
                });
                this.selectedFiles = undefined;
            }
        });
    }

    private checkExtension(file: File): boolean {
        const extensions = ['image/jpeg', 'image/png'];
        console.log(file.type);
        return extensions.indexOf(file.type) !== -1;
    }
}
