import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Photo} from '../../../models/photo';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {AlertifyService} from '../../../services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() showPhotoUploader: boolean;


  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {

    this.uploader = new FileUploader({
      url: `${environment.url}/api/users/${this.authService.currentUser.id}/photo`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo: Photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
          dateAdded: res.dateAdded,
          description: res.description
        };
        this.photos.push(photo);
        this.authService.changeMemberPhoto(photo.url);
      }
    };
  }

  updateMainPhoto(idPhoto: number) {
    this.userService.updateMainPhoto(+this.authService.currentUser.id, idPhoto)
      .subscribe(next => {
        this.photos.map(p => {
          if (p.isMain) {
            p.isMain = false;
          }
          if (p.id === idPhoto) {
            p.isMain = true;

            this.authService.changeMemberPhoto(p.url);
            const user = JSON.parse(localStorage.getItem('user'));
            user.image = p.url;
            localStorage.setItem('user', JSON.stringify(user));
          }

          return p;
        });
      }, error => this.alertify.error(error));
  }

  deletePhoto(idPhoto: number) {
    this.alertify.confirm('Are you sure to delete this photo?', () => {
      this.userService.deletePhoto(+this.authService.currentUser.id, idPhoto)
        .subscribe(next => {
          this.photos = this.photos.filter(p => p.id !== idPhoto);
        }, error => this.alertify.error(error));
    });
  }
}
