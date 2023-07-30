import {
  Component,
  Input,
  OnChanges,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog/dog.service';
import { Dog } from '../../services/dog/dog.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dogs-dog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="normal-case text-xl">Dog Information</h2>
    <div>ID: {{ dog()?.id }}</div>
    <div>Name: {{ dog()?.name }}</div>
    <div *ngIf="dog()?.dogMultisigAddress as dogMultisigAddress">
      Address:
      <a
        class="link"
        href="https://testnet.symbol.fyi/accounts/{{ dogMultisigAddress }}"
        >{{ dogMultisigAddress }}</a
      >
    </div>
    <div *ngIf="dog()?.dogMultisigPublicKey as dogMultisigPublicKey">
      Public Key: {{ dogMultisigPublicKey }}
    </div>
    <div>Registration Number: {{ dog()?.registrationNumber }}</div>
    <div>Breed: {{ dog()?.breed }}</div>
    <div>Gender: {{ dog()?.gender }}</div>
    <div>Color: {{ dog()?.color }}</div>
    <div *ngIf="dog()?.father as father">
      Father:
      <a class="link" routerLink="/dogs/{{ father }}"> {{ father }}</a>
    </div>
    <div *ngIf="dog()?.mother as mother">
      Mother:
      <a class="link" routerLink="/dogs/{{ mother }}"> {{ mother }}</a>
    </div>
    <div>Birth Date: {{ dog()?.birthDate }}</div>
    <div>Created At: {{ dog()?.createdAt }}</div>
    <div>Updated At: {{ dog()?.updatedAt }}</div>
    <div>Deleted At: {{ dog()?.deletedAt }}</div>
    <div *ngIf="dog()?.ownerUserId as ownerUserId">
      Owner ID:
      <a class="link" routerLink="/users/{{ ownerUserId }}">
        {{ ownerUserId }}</a
      >
    </div>

    <a class="btn btn-primary my-4" routerLink="/dogs/{{ dogId }}/posts/create"
      >Add this dog's record</a
    >
  `,
  styles: [],
})
export class DogsDogComponent implements OnChanges {
  @Input() dogId?: string;

  private dogService = inject(DogService);

  dog: WritableSignal<Dog | undefined> = signal(undefined);

  constructor() {
    effect(() => {
      if (!this.dogId) {
        return;
      }
      this.dogService.getDog(this.dogId).then((dog) => {
        this.dog.set(dog);
      });
    });
  }

  ngOnChanges() {
    if (!this.dogId) {
      return;
    }
    this.dogService.getDog(this.dogId).then((dog) => {
      this.dog.set(dog);
    });
  }
}
