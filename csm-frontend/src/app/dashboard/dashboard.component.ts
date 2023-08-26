import { Component, ViewChild, OnInit } from '@angular/core';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { NgForm } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripe: any;
  images: any = [];
  files: any = [];
  photo: any;
  type: string = '';
  isSubscribed: boolean = true;
  email: string = '';
  selectedPlan: string = 'free';
  stripeTest: any;
  disableBtn: boolean = false;
  isPaymentDone: boolean = false;

  constructor(
    private imageService: ImageService,
    private authService: AuthService,
    private StripeS: StripeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['Test', [Validators.required]],
    });
    this.getUserDetails();

    this.stripe = await loadStripe(environment.stripPublishKey);
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.photo = file;
    }
  }
  handleFileInputMutiple(event: any) {
    this.files.push(...event.target.files);
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('imageUrl', this.photo);
    this.imageService.uploadImageForFreeTier(formData).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.toastr.show('Image uploaded successfully');
          //
          this.getUserDetails();
          this.photo = '';
        }
      },
      (err) => {
        this.toastr.error(err.error.message);

        this.photo = '';
      }
    );
  }
  UploadMutipleImages() {
    const formData = new FormData();
    this.files.forEach((file: any) => {
      formData.append('imageUrl', file);
    });
    this.imageService.uploadImageForProTier(formData).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.toastr.show('Images uploaded successfully');
          //
          this.getUserDetails();
          this.files = [];
        }
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  async handleSubscriptionToggle(event: any) {
    try {
      if (!event.checked) {
        // if (
        //   confirm(
        //     'Your subscription will be cancel and you will have to pay again for Pro plan. Are you sure you want to switch to Free Plan?'
        //   )
        // ) {
        this.imageService.cancelSubscription(this.email).subscribe(
          (res: any) => {
            console.log(res);
            this.toastr.show('Subscription cancel successfully');
            this.checkSubscription(this.email);
          },
          (err) => {
            this.toastr.error(err.error.error);
          }
        );
        // }
      }
    } catch (error) {}
  }
  user: any = {};
  getUserDetails() {
    this.authService.getUserDetails().subscribe((res: any) => {
      console.log(res);
      this.user = res.user;
      this.email = res.user.email;
      this.checkSubscription(this.email);
    });
  }

  checkSubscription(email: any) {
    this.imageService.checkSubscriptionStatus(email).subscribe((res: any) => {
      if (res.Subscription) {
        this.isSubscribed = res.Subscription == 'free' ? false : true;
        this.type = res.Subscription;
      }
    });
  }

  createToken() {
    this.disableBtn = true;
    const name = this.stripeTest.get('name').value;
    this.StripeS.createToken(this.card.element, { name }).subscribe(
      (result: any) => {
        if (result.token) {
          this.imageService
            .subscribe(this.email, result.token.id)
            .subscribe((res: any) => {
              this.toastr.show('Subscribed successfully');
              this.checkSubscription(this.email);
            });
        } else if (result.error) {
          this.toastr.show(result.error.message);
        }
      }
    );
  }
  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    link.target = '_blank';
    link.click();
  }
  onFormChange(e: any) {
    console.log(e);
    if (e.complete == true) {
      this.isPaymentDone = true;
    }
  }
}
