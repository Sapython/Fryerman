import { CheckoutStepTwoComponent } from './checkout-step-two/checkout-step-two.component';
import { CheckoutStepOneComponent } from './checkout-step-one/checkout-step-one.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CartComponent } from './cart/cart.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../app/services/auth.service';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AdminGuard } from './admin.guard';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
// const belongsToAccount = ((next:any) => {
//   map(user =>  ? ['/admin'] : ['login']);
// })
const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard] , data: { authGuardPipe: redirectLoggedInTo(['/login']), "route":"checkout" }},
  { path: '', component: HomeComponent },
  { path: 'orders', component:OrdersComponent,canActivate:[AuthGuard], data:{"route":"/orders"} },
  { path: 'paymentGateway', component:PaymentGatewayComponent,canActivate:[AuthGuard], data:{"route":"/paymentGateway"} },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:SignupComponent },
  { path: 'verifyEmail', component:VerifyEmailComponent },
  { path: 'forgotPassword', component:ForgotPasswordComponent },
  { path: 'admin', component:AdminPanelComponent ,canActivate: [AdminGuard] },
  { path: 'help', component:HelpPageComponent },
  { path: 'privacy', component:PrivacyPolicyComponent },
  { path: 'terms', component:TermsAndConditionsComponent },
  { path: 'disclaimer', component:DisclaimerComponent },
  { path: 'payment', component:PaymentRequestComponent},
  { path: 'success', component:PaymentSuccessComponent},
  { path: 'failure', component:PaymentFailureComponent},
  { path: 'cart', component:CartComponent, canActivate: [AngularFireAuthGuard], data:{"route":"/cart"} },
  { path: 'steponecheckout', component:CheckoutStepOneComponent, canActivate: [AngularFireAuthGuard], data:{"route":"/cart"} },
  { path: 'steptwocheckout', component:CheckoutStepTwoComponent, canActivate: [AngularFireAuthGuard], data:{"route":"/cart"} },

  { path: '**', component:NotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
