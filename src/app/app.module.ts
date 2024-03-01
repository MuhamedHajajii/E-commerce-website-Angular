import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { BlankNavbarComponent } from './components/blank-navbar/blank-navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { BlankComponent } from './components/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeEyelookComponent } from './components/home-eyelook/home-eyelook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainsliderComponent } from './components/home/mainslider/mainslider.component';
import { CategorieSliderComponent } from './components/home/categorie-slider/categorie-slider.component';
import { TexttermPipe } from './shared/pipe/textterm.pipe';
import { SearchPipe } from './shared/pipe/search.pipe';
import { SearchComponent } from './components/search/search.component';
import { LoginsvgComponent } from './components/blank-navbar/loginsvg/loginsvg.component';
import { MainSearchBarComponent } from './components/blank-navbar/main-search-bar/main-search-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OnlinePaymentComponent } from './components/online-payment/online-payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CashPaymentComponent } from './components/cash-payment/cash-payment.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SpecificCategoryComponent } from './components/categories/specific-category/specific-category.component';
import { SpecificBrandComponent } from './components/brands/specific-brand/specific-brand.component';
import { SubcategoriesComponent } from './components/blank-navbar/subcategories/subcategories.component';
import { AllsupcategoriesComponent } from './components/blank-navbar/subcategories/allsupcategories/allsupcategories.component';
import { WishlistComponent } from './components/blank-navbar/wishlist/wishlist.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/loading.interceptor';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountSettingComponent } from './components/settings/account-setting/account-setting.component';
import { PrivacySettingsComponent } from './components/settings/privacy-settings/privacy-settings.component';
import { AddressComponent } from './components/settings/address/address.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotfoundComponent,
    DetailsComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    AuthNavbarComponent,
    BlankNavbarComponent,
    AuthComponent,
    BlankComponent,
    HomeEyelookComponent,
    MainsliderComponent,
    CategorieSliderComponent,
    TexttermPipe,
    SearchPipe,
    SearchComponent,
    LoginsvgComponent,
    MainSearchBarComponent,
    OnlinePaymentComponent,
    AllordersComponent,
    CashPaymentComponent,
    OrderDetailsComponent,
    SpecificCategoryComponent,
    SpecificBrandComponent,
    SubcategoriesComponent,
    AllsupcategoriesComponent,
    WishlistComponent,
    ForgetPasswordComponent,
    SettingsComponent,
    AccountSettingComponent,
    PrivacySettingsComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      enableHtml: true,
    }),
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
