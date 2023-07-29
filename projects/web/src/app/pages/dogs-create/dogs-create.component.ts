import {
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dog, NewDog } from '../../services/dog/dog.type';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { DogService } from '../../services/dog/dog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dogs-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="normal-case text-xl">Register New Dog Information</h2>
    <form class="w-full" #form="ngForm" (ngSubmit)="handleSubmit()">
      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          name="name"
          [ngModel]="name()"
          (ngModelChange)="name.set($event)"
          type="text"
          placeholder="Example: Luna"
          class="input input-bordered"
          required
        />
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Registration Number</span>
        </label>
        <input
          name="registrationNumber"
          [ngModel]="registrationNumber()"
          (ngModelChange)="registrationNumber.set($event)"
          type="text"
          placeholder="Example: 1234567890"
          class="input input-bordered"
          required
        />
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Pick Breed</span>
        </label>
        <select
          name="breed"
          [ngModel]="breed()"
          (ngModelChange)="breed.set($event)"
          class="select select-bordered required"
        >
          <option value="" disabled selected>Pick one</option>
          <option
            *ngFor="let breedOption of breedOptions"
            [value]="breedOption"
          >
            {{ breedOption }}
          </option>
        </select>
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Pick Gender</span>
        </label>
        <select
          name="gender"
          [ngModel]="gender()"
          (ngModelChange)="gender.set($event)"
          class="select select-bordered required"
        >
          <option value="" disabled selected>Pick one</option>
          <option
            *ngFor="let genderOption of genderOptions"
            [value]="genderOption"
          >
            {{ genderOption }}
          </option>
        </select>
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Pick Father</span>
        </label>
        <select
          name="color"
          [ngModel]="color()"
          (ngModelChange)="color.set($event)"
          class="select select-bordered required"
        >
          <option value="" disabled selected>Pick one</option>
          <option
            *ngFor="let colorOption of colorOptions"
            [value]="colorOption"
          >
            {{ colorOption }}
          </option>
        </select>
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Search and Pick Father</span>
        </label>
        <div class="join">
          <input
            name="searchFatherKeyword"
            [ngModel]="searchFatherKeyword()"
            (ngModelChange)="searchFatherKeyword.set($event)"
            type="text"
            placeholder="Search Father Name..."
            class="input input-bordered"
          />
          <select
            name="father"
            [ngModel]="father()"
            (ngModelChange)="father.set($event)"
            class="select select-bordered required"
          >
            <option value="" selected>Unknown</option>
            <option
              *ngFor="let fatherOption of fatherOptions()"
              [value]="fatherOption.id"
            >
              name: {{ fatherOption.name }}, breed: {{ fatherOption.breed }},
              birthDate: {{ fatherOption.birthDate }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Search and Pick Mother</span>
        </label>
        <div class="join">
          <input
            name="searchMotherKeyword"
            [ngModel]="searchMotherKeyword()"
            (ngModelChange)="searchMotherKeyword.set($event)"
            type="text"
            placeholder="Search Mother Name..."
            class="input input-bordered"
          />
          <select
            name="mother"
            [ngModel]="mother()"
            (ngModelChange)="mother.set($event)"
            class="select select-bordered required"
          >
            <option value="" selected>Unknown</option>
            <option
              *ngFor="let motherOption of motherOptions()"
              [value]="motherOption.id"
            >
              name: {{ motherOption.name }}, breed: {{ motherOption.breed }},
              birthDate: {{ motherOption.birthDate }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Birth Date</span>
        </label>
        <input
          name="birthDate"
          [ngModel]="birthDate()"
          (ngModelChange)="birthDate.set($event)"
          type="date"
          class="input input-bordered"
          required
        />
      </div>

      <button class="btn btn-primary my-4" [disabled]="!form.valid">
        Register
      </button>
    </form>
  `,
  styles: [],
})
export class DogsCreateComponent {
  private authService = inject(AuthService);
  private dogService = inject(DogService);
  private router = inject(Router);

  searchFatherKeyword = signal('');
  searchMotherKeyword = signal('');

  fatherOptions: WritableSignal<Dog[]> = signal([]);
  motherOptions: WritableSignal<Dog[]> = signal([]);

  breedOptions = [
    'Beagle',
    'Basset Hound',
    'Bull Terrier',
    'Bulldog',
    'Boxer',
    'Welsh Corgi',
    'Chihuahua',
    'Dachshund',
    'Doberman Pinscher',
    'Dolmatian',
    'German Shepherd',
    'Golden Retriever',
    'Labrador Retriever',
    'Maltese',
    'Old English Sheepdog',
    'Pekingese',
  ];
  genderOptions = ['Male', 'Female'];
  colorOptions = [
    'white',
    'black',
    'red',
    'blue',
    'yellow',
    'green',
    'brown',
    'orange',
    'purple',
    'gray',
  ];

  authUser = this.authService.authUser;

  name = signal('');
  registrationNumber = signal('');
  breed = signal(this.breedOptions[0]);
  gender = signal(this.genderOptions[0]);
  color = signal(this.colorOptions[0]);
  father = signal('');
  mother = signal('');
  birthDate = signal('');
  createdAt = signal(new Date());
  ownerUserId = computed(() => {
    const authUser = this.authUser();
    if (!authUser) {
      return '';
    }
    return authUser.uid;
  });

  newDog: Signal<NewDog> = computed(() => {
    return {
      name: this.name(),
      registrationNumber: this.registrationNumber(),
      breed: this.breed(),
      gender: this.gender(),
      color: this.color(),
      father: this.father(),
      mother: this.mother(),
      birthDate: this.birthDate(),
      createdAt: this.createdAt(),
      ownerUserId: this.ownerUserId(),
    };
  });

  constructor() {
    effect(() => {
      console.log({
        newDog: this.newDog(),
      });
      this.dogService
        .queryDogsByNameAndGender(this.searchFatherKeyword(), 'Male')
        .then((dogs) => {
          console.log({ fatherOptions: dogs });
          this.fatherOptions.set(dogs);
        });
      this.dogService
        .queryDogsByNameAndGender(this.searchMotherKeyword(), 'Female')
        .then((dogs) => {
          console.log({ motherOptions: dogs });
          this.motherOptions.set(dogs);
        });
    });
  }

  async handleSubmit() {
    this.createdAt.set(new Date());
    console.log(this.newDog());
    const dog = await this.dogService.createDog(this.newDog());
    if (!dog) {
      return;
    }
    this.router.navigate([`/dogs/${dog.id}`]);
  }
}
