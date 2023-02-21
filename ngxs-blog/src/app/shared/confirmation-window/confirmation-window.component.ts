import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

export interface DialogData {
    title: string;
    question: string;
}

@Component({
    selector: 'app-confirmation-window',
    templateUrl: './confirmation-window.component.html',
    styleUrls: ['./confirmation-window.component.scss'],
})
export class ConfirmationWindowComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationWindowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit(): void {}
    cancel = () => {
        this.dialogRef.close({ confirmed: false });
    };

    confirm = () => {
        this.dialogRef.close({ confirmed: true });
    };
}
