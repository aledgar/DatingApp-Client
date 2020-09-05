import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {TabsetComponent} from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('staticOptions', {static: true}) sectionTabs: TabsetComponent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public user: User;

  constructor(private userService: UserService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });

    this.router.queryParamMap.subscribe(params => {
      if (params.get('messages')) {
        if (+params.get('messages') === 2) {
          this.sectionTabs.tabs[2].active = true;
        }
      }
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.user.photos.map(p => ({
      small: p.url,
      medium: p.url,
      big: p.url
    }));
  }

}
