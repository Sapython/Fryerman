import { DataProvider} from './providers/checkoutData.provider';
import { AuthGuard } from './core/auth.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InventoryService } from './services/inventory.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from "./services/auth.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HistoryCardComponent } from './history-card/history-card.component';
import { AgmCoreModule, AgmGeocoder } from '@agm/core';
import { LiveOrderComponent } from './live-order/live-order.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ProductSummaryCardComponent } from './product-summary-card/product-summary-card.component';
import { AdminNewOrdersComponent } from './admin-new-orders/admin-new-orders.component';
import { AdminOldOrdersComponent } from './admin-old-orders/admin-old-orders.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { USE_EMULATOR as FUNCTIONS_EMULATOR } from '@angular/fire/functions';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { recommendor } from './services/recommendation.engine.service';
import { HomePageProvider } from './providers/homePageData.provider';
import { CheckoutStepOneComponent } from './checkout-step-one/checkout-step-one.component';
import { CheckoutStepTwoComponent } from './checkout-step-two/checkout-step-two.component';
import { MapDataProvider } from './providers/mapData.provider';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    AppComponent,
    PaymentGatewayComponent,
    OrdersComponent,
    ProductComponent,
    CheckoutComponent,
    HomeComponent,
    HistoryCardComponent,
    LiveOrderComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AdminPanelComponent,
    ProfileComponent,
    NotFoundComponent,
    HelpPageComponent,
    ProductSummaryCardComponent,
    AdminNewOrdersComponent,
    AdminOldOrdersComponent,
    DisclaimerComponent,
    TermsAndConditionsComponent,
    CartComponent,
    PaymentRequestComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    CheckoutStepOneComponent,
    CheckoutStepTwoComponent,
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "REPLACEMENT_STRING",
      libraries: ["places", "geometry"]
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireFunctionsModule,
    ToastrModule.forRoot({
      timeOut:2000,
    }),
  ],
  providers: [
    HomePageProvider,
    DataProvider,
    recommendor,
    AuthService,
    AuthGuard,
    Geolocation,
    MapDataProvider,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    {
      provide: FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5001],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
