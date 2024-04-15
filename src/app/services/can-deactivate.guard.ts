import { CanDeactivateFn } from '@angular/router';
import { OrderViewComponent } from '../order-view/order-view.component';

export const canDeactivateGuard: CanDeactivateFn<OrderViewComponent> = (
  component: OrderViewComponent,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
