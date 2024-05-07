import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FileUploadComponent, FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ImageUploadService } from './image-upload.service';

@Component({
  selector: 'asha-image-upload',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, AsyncPipe],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  public uploadedFile: BehaviorSubject<string | ArrayBuffer> = new BehaviorSubject(null);

  private subscription: Subscription;

  @Input()
  initial: string

  // @Input()
  // control: FileUploadControl;
  public control = new FileUploadControl(
    { accept: ['image/*'], multiple: false },
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.filesLimit(1)]
  );

  @Output()
  uploadSuccess = new EventEmitter<any>()

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.initial?.currentValue) {
      this.imageUploadService.getToFile(changes?.initial.currentValue)
        .subscribe(image => {
          this.control.setValue([image])
        });
    }
  }

  ngOnInit(): void {
    if (this.control) {
      this.subscription = this.control.valueChanges.subscribe((values: Array<File>) => {
        if (values.length) {
          this.getImage(values[0]);
          if (values[0].name != 'image') {
            this.uploadSuccess.emit(values[0])
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getImage(file: File): void {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e) => this.uploadedFile.next(e.target.result);
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next(null);
    }
  }
}
