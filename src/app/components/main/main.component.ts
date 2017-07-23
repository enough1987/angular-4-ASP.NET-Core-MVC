import { Component } from '@angular/core';


import { HttpService } from "app/services/http.service";
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  stripeId: string = "";
  private stripeServer: string = "http://ec2-52-59-169-152.eu-central-1.compute.amazonaws.com:3000";
  private stripeServerLocal: string = "http://localhost:3000";
  private card: any;
  private stripe: any;
  private amount: any;
  msg: any;

  constructor(public httpService: HttpService, public authService: AuthService) {
    console.log(" constructor of main ");
  }

  ngOnInit() {

    //this.stripe = (<any>window).Stripe('pk_test_HRr0GJHQNM2hxAAT7kYtGWWR');
    this.stripe = (<any>window).Stripe('pk_live_8lalIH22Uy2EuumE8x6aQfsW');

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

  paypalGet = () => {

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

    console.log( " RESULT : ", result );

    let errorElement = document.querySelector('.error');

    errorElement.classList.remove('visible');

    if (result.token) {

      this.authService.userInfo.stripeToken = result.token.id;
      this.authService.userInfo.stripeCountry = result.token.card.country;
      this.authService.userInfo.stripeCurrency = result.token.card.currency;
      console.log(" --- --- ", this.authService.userInfo.stripeToken);
      this.payout() // this.charge(); //this.payout();
    } else if (result.error) {
      errorElement.textContent = result.error.message;
      errorElement.classList.add('visible');
    }
  };

  createToken = (amount, callback ) => {
    console.log(" createToken ", amount);
    this.amount = amount;

    let extraDetails = {
      currency: "gbp" // "usd"
    };

    this.stripe.createToken(this.card, extraDetails).then( this.setOutcome );
  }

  private payout = () => {

    console.log(" stripeId  ", this.stripeId);
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/transfer" +
      "?token=" + this.authService.userInfo.stripeToken +
      "&country=" + this.authService.userInfo.stripeCountry +
      "&currency=" + this.authService.userInfo.stripeCurrency +
      "&amount=" + this.amount 
    ).subscribe((data: any) => {
      console.log(" PAYOUT ", data);
      this.msg = data.message;
    }, (err) => {
      console.log(err);
    });
  }

  charge = () => {
    console.log(" stripeId  ", this.stripeId);
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/charge" +
      "?token=" + this.authService.userInfo.stripeToken +
      "&country=" + this.authService.userInfo.stripeCountry +
      "&currency=" + this.authService.userInfo.stripeCurrency +
      "&amount=" + this.amount 
    ).subscribe((data: any) => {
      console.log(" CHARGE ", data);
    }, (err) => {
      console.log(err);
    });
  }

  payout2 = () => {
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

  list = () => {
    this.httpService.get(
      this.stripeServerLocal + "/api/stripe/list").subscribe((data: any) => {
        console.log(" CHARGE ", data);
      }, (err) => {
        console.log(err);
      });
  }


}
