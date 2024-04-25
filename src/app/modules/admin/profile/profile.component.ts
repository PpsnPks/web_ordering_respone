import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ProfileService} from './profile.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BranchComponent } from '../branch/page.component';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-page-store',
    standalone: true,
    imports: [
        CommonModule,
        DataTablesModule,
        MatButtonModule,
        MatIconModule,
        FilePickerModule,
        MatMenuModule,
        MatDividerModule,
        MatFormFieldModule, 
        MatInputModule,
        FormsModule, 
        MatToolbarModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        BranchComponent
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ProfileComponent implements OnInit {
    form: FormGroup;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    store: any;
    storeId: number
    profile: any;
    constructor(
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public _service: ProfileService,

    ) {
    
        this.storeId = this.activatedRoute.snapshot.params.id;
        console.log(this.storeId)
        this.form = this.fb.group({
            code: '',
            username: '',
            fullName: '',
            phoneNumber: ''
        })
    }
    ngOnInit(): void {
        this._service.getStoreId(this.storeId).subscribe((resp: any) => {
            this.store = resp
            
            this.form.patchValue({
            ...this.store
            })
         })
        this.loadProfile();
       
    }

	loadProfile():void {
		this._service.getProfile().subscribe((resp: any)=>{
			this.profile = resp;
			console.log(resp);
            this.form.patchValue({
                code: resp.code,
                username: resp.username,
                fullName: resp.fullName,
                phoneNumber: resp.phoneNumber,
              });
		})
        //console.log(this.form);
        
	}

    Submit() {
        let formValue = this.form.value
        const confirmation = this.fuseConfirmationService.open({
            title: "ยืนยันการบันทึกข้อมูล",
            icon: {
                show: true,
                name: "heroicons_outline:exclamation-triangle",
                color: "primary"
            },
            actions: {
                confirm: {
                    show: true,
                    label: "ยืนยัน",
                    color: "primary"
                },
                cancel: {
                    show: true,
                    label: "ยกเลิก"
                }
            },
            dismissible: false
        })

        confirmation.afterClosed().subscribe(
            result => {
                if (result == 'confirmed') {
                    this._service.update(this.store.id ,formValue).subscribe({
                        error: (err) => {
                            this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                        },
                        complete: () => {
                            this.toastr.success('ดำเนินการแก้ไขข้อมูลสำเร็จ')
                           
                        },
                    });
                }
            }
        )
    }

  


}
