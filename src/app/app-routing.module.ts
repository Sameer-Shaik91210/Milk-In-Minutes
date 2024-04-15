import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderViewComponent } from './order-view/order-view.component';
import { LoginComponent } from './login/login.component';
import { DairyProductRequestsComponent } from './dairy-product-requests/dairy-product-requests.component';
import { canDeactivateGuard } from './services/can-deactivate.guard';
import { AuthGuard } from './services/auth.guard';
import { ProductsComponent } from './products/products.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'orderView/:id',
    component: OrderViewComponent,
    canDeactivate: [canDeactivateGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dairy-product-orders',
    component: DairyProductRequestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
