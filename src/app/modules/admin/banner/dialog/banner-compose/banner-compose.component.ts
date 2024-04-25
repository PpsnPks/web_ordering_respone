import { BannerService } from '../../banner.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ValidationError, FilePickerModule } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from 'app/demo-file-picker.adapter';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-banner-compose',
  standalone: true,
  templateUrl: './banner-compose.component.html',
  styleUrl: './banner-compose.component.scss',
  imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatToolbarModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions,
    MatDialogClose, MatSelectModule, FilePickerModule, NgxMaskDirective, ReactiveFormsModule, MatSlideToggleModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class BannerComposeComponent implements OnInit {
  form: FormGroup;
  adapter = new DemoFilePickerAdapter(this.http);

  constructor(
    private dialogRef: MatDialogRef<BannerComposeComponent>,
    public dialog: MatDialog,
    private FormBuilder: FormBuilder,
    public BannerService: BannerService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: [''],
      isShow: [true, Validators.required],
    });

  }

  Submit() {
    if (this.form.invalid) {
      return;
    }

    this.BannerService.create(this.form.value).subscribe({
      next: (resp: any) => {
        this.dialogRef.close(true)
      }
    })
  }

  uploadSuccess(event): void {
    this.form.patchValue({
      image: event.uploadResponse.filename
    });
  }

  onValidationError(error: ValidationError): void {
    alert(`Validation Error ${error.error} in ${error.file?.name}`);
  }

}
