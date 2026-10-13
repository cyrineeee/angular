import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../event-service';

@Component({
  selector: 'app-event-details',
  imports: [RouterLink],
  templateUrl: './event-details.html'
})
export class EventDetails {
  // Injecter le service ActivatedRoute
  private rt = inject(ActivatedRoute);
  private service = inject(EventService);

  // Récupérer l'id de l'url
  id = this.rt.snapshot.paramMap.get('id');

  // Récupérer l'événement correspondant à cet id
  event = this.service.getById(Number(this.id));
}