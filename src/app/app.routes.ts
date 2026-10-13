import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductList } from './product-list/product-list';
import { Events } from './events/events';
import { AddEvent } from './add-event/add-event';
import { EventDetails } from './event-details/event-details';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'events', component: Events },
  { path: 'events/add', component: AddEvent },
  { path: 'events/:id', component: EventDetails },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' }
];