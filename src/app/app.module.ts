import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeEyelookComponent } from './components/home-eyelook/home-eyelook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainsliderComponent } from './components/home/mainslider/mainslider.component';
import { CategorieSliderComponent } from './components/home/categorie-slider/categorie-slider.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
