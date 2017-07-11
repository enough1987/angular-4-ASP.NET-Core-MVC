import { Component } from '@angular/core';


import { HttpService, AuthService } from "app/index";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  stripeId: string = "";
  private stripeServer: string = "http://ec2-52-59-169-152.eu-central-1.compute.amazonaws.com:3000";
  private stripeServerLocal: string = "http://localhost:3000";
  private card;
  private stripe;
  private amount;

  constructor(private httpService: HttpService, private authService: AuthService) {
    console.log(" constructor of main ");
  }

  ngOnInit() {


    this.stripe = (<any>window).Stripe('pk_test_HRr0GJHQNM2hxAAT7kYtGWWR');
    //this.stripe = (<any>window).Stripe('pk_live_8lalIH22Uy2EuumE8x6aQfsW');
    let elements = this.stripe.elements();

    this.card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#F99A52',
          color: '#32315E',
          lineHeight: '48px',
          fontWeight: 400,
          fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
          fontSize: '15px',

          '::placeholder': {
            color: '#CFD7DF',
          }
        },
      }
    });
    this.card.mount('#card-element');

    this.card.on('change', (event) => {
      this.setOutcome(event);
    });


  }

  private paypalGet() {

    this.httpService.post(
      this.stripeServerLocal + "/api/paypal/payout", {
        amount: 1,
        currency: "USD",
        description: " pay now "
      }).subscribe((data: any) => {
        console.log(" PAYPAL : ", data);
      });
  }

  private setOutcome = (result) => {
    let successElement = document.querySelector('.success');
    let errorElement = document.querySelector('.error');
    successElement.classList.remove('visible');
    errorElement.classList.remove('visible');

    if (result.token) {
      successElement.querySelector('.token').textContent = result.token.id;
      successElement.classList.add('visible');
      this.authService.userInfo.stripeToken = result.token.id;
      console.log(" --- --- ", this.authService.userInfo.stripeToken);
      this.payout();
    } else if (result.error) {
      errorElement.textContent = result.error.message;
      errorElement.classList.add('visible');
    }
  };

  createToken(amount) {
    console.log(" createToken ", amount);
    this.amount = amount;

    let extraDetails = {
      currency: "usd"
    };

    this.stripe.createToken(this.card, extraDetails).then(this.setOutcome);
  }

  private payout() {
    console.log(" stripeId  ", this.stripeId);
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/payout" +
      "?token=" + this.authService.userInfo.stripeToken +
      "&amount=" + this.amount
    ).subscribe((data: any) => {
      console.log(" PAYOUT ", data);
    }, (err) => {
      console.log(err);
    });
  }

  private charge() {
    console.log(" stripeId  ", this.stripeId);
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/charge" +
      "?token=" + this.authService.userInfo.stripeToken
    ).subscribe((data: any) => {
      console.log(" CHARGE ", data);
    }, (err) => {
      console.log(err);
    });
  }

  payout2() {
    this.stripe.createToken(this.card).then((result) => {
      if (result.token) {
        this.authService.userInfo.stripeToken = result.token.id;
        console.log("?token=" + this.authService.userInfo.stripeToken);
        this.httpService.get(
          this.stripeServerLocal + "/api/stripe/payout2" +
          "?token=" + this.authService.userInfo.stripeToken
        ).subscribe((data: any) => {
          console.log(" payout2 ", data);
        }, (err) => {
          console.log(err);
        });
      }
    });

  }

  list() {
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/list").subscribe((data: any) => {
        console.log(" CHARGE ", data);
      }, (err) => {
        console.log(err);
      });
  }


}
