import { Injectable, inject, signal } from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  collectionData,
  docData,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Dog, NewDog, UpdatedDog } from './dog.type';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private firestore = inject(Firestore);

  collectionPath = '/dogs';
  docPath = (dogId: string) => `${this.collectionPath}/${dogId}`;
  converter = {
    toFirestore: (dog: Dog) => dog,
    fromFirestore: (snapshot: any) => {
      const firestoreDog = snapshot.data();
      firestoreDog.createdAt = firestoreDog.createdAt.toDate();
      firestoreDog.updatedAt = firestoreDog.updatedAt?.toDate();
      firestoreDog.deletedAt = firestoreDog.deletedAt?.toDate();
      return firestoreDog as Dog;
    },
  };
  private collectionRef = collection(
    this.firestore,
    this.collectionPath,
  ).withConverter(this.converter);
  private docRef = (dogId: string) =>
    doc(this.collectionRef, dogId).withConverter(this.converter);

  async getDog(dogId: string) {
    return (await getDoc(this.docRef(dogId))).data();
  }

  getDog$(dogId: string) {
    console.log('getDog$', dogId);
    return docData(this.docRef(dogId));
  }

  getDogs$() {
    return collectionData(this.collectionRef);
  }

  async createDog(newDog: NewDog) {
    const id = doc(this.collectionRef).id;
    await setDoc(this.docRef(id), { id, ...newDog });
    return (await getDoc(this.docRef(id))).data();
  }

  async updateDog(updatedDog: UpdatedDog) {
    await setDoc(this.docRef(updatedDog.id), updatedDog, {
      merge: true,
    });
    return await getDoc(this.docRef(updatedDog.id));
  }

  async deleteDog(dogId: string) {
    return await deleteDoc(this.docRef(dogId));
  }

  async queryDogsByNameAndGender(name: string, gender: string) {
    return (
      await getDocs(
        query(
          this.collectionRef,
          where('name', '==', name),
          where('gender', '==', gender),
        ),
      )
    ).docs.map((snapshot) => snapshot.data());
  }
}
