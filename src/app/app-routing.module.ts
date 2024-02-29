import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGurdGuard } from './shared/gurd/auth-gurd.guard';
import { SearchComponent } from './components/search/search.component';
import { OnlinePaymentComponent } from './components/online-payment/online-payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CashPaymentComponent } from './components/cash-payment/cash-payment.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SpecificCategoryComponent } from './components/categories/specific-category/specific-category.component';
import { SpecificBrandComponent } from './components/brands/specific-brand/specific-brand.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGurdGuard],
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'cart', component: CartComponent, title: 'Fresh Market - cart' },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Fresh Market - Brands',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Fresh Market - Categories',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Fresh Market - Deatils',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Fresh Market - Products',
      },
      {
        path: 'search',
        component: SearchComponent,
        title: 'Fresh Market - search Results',
      },
      {
        path: 'useradress/:id',
        component: OnlinePaymentComponent,
        title: 'Fresh Market - payment',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'Fresh Market - All Orders',
      },
      {
        path: 'cash/:id',
        component: CashPaymentComponent,
        title: 'Fresh Market - confirm order',
      },
      {
        path: 'order/:id',
        component: OrderDetailsComponent,
        title: 'Fresh Market - Order Details',
      },
      {
        path: 'specific-category/:id',
        component: SpecificCategoryComponent,
        title: 'Fresh Market - Category Products',
      },
      {
        path: 'specific-brand/:id',
        component: SpecificBrandComponent,
        title: 'Fresh Market - Brand Products',
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
