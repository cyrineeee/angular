import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { EventService } from '../event-service';

// Validateur personnalisé : la date ne doit pas être dans le passé
function futureDate(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const chosen = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return chosen < today ? { pastDate: true } : null;
}

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-event.html'
})
export class AddEvent {
  private service = inject(EventService);
  private router = inject(Router);

  // Structure du formulaire + contraintes
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, futureDate]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),
    seats: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    })
  });

  // Signals à la place de valueChanges / statusChanges
  value = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  status = toSignal(this.form.statusChanges, { initialValue: this.form.status });

  descriptionLength = computed(() => this.value().description?.length ?? 0);
  isValid = computed(() => this.status() === 'VALID');

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.service.add({
      name: v.name,
      description: v.description,
      location: v.location,
      // yyyy-mm-dd  ->  dd-mm-yyyy
      date: v.date.split('-').reverse().join('-'),
      price: v.price,
      seats: v.seats
    });
    this.router.navigate(['/events']);
  }
}
