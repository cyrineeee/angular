import { Injectable, signal } from '@angular/core';
import { EventM } from './models/event';

@Injectable({ providedIn: 'root' })
export class EventService {
  events = signal<EventM[]>([
    { id: 1, name: 'workshop',  description: 'workshop angular', location: 'tunis', date: '30-09-2026', price: 500, seats: 5 },
    { id: 2, name: 'hackathon', description: 'workshop angular', location: 'tunis', date: '30-09-2026', price: 500, seats: 5 }
  ]);

  getById(id: number): EventM | undefined {
    return this.events().find(e => e.id === id);
  }

  add(e: Omit<EventM, 'id'>) {
    const nextId = Math.max(0, ...this.events().map(x => x.id)) + 1;
    this.events.update(list => [...list, { id: nextId, ...e }]);
  }
}