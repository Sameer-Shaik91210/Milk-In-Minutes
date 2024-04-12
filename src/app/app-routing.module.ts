import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { LoginComponent } from './login/login.component';
import { DairyProductRequestsComponent } from './dairy-product-requests/dairy-product-requests.component';
import { canDeactivateGuard } from './services/can-deactivate.guard';
import { AuthGuard } from './services/auth.guard';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'orderView/:id',
    component: OrderViewComponent,
    canDeactivate: [canDeactivateGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dairy-product-requests',
    component: DairyProductRequestsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
