import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../event-service';

@Component({
  selector: 'app-events',
  imports: [RouterLink],
  templateUrl: './events.html'
})
export class Events {
  events = inject(EventService).events;
}