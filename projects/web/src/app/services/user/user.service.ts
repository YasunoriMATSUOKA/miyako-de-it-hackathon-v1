import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  collectionData,
  docData,
  setDoc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { User, NewUser, UpdatedUser } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);

  collectionPath = '/users';
  docPath = (uid: string) => `${this.collectionPath}/${uid}`;
  converter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: any) => {
      const firestoreUser = snapshot.data();
      firestoreUser.createdAt = firestoreUser.createdAt.toDate();
      firestoreUser.updatedAt = firestoreUser.updatedAt?.toDate();
      firestoreUser.deletedAt = firestoreUser.deletedAt?.toDate();
      return firestoreUser as User;
    },
  };
  private collectionRef = collection(
    this.firestore,
    this.collectionPath,
  ).withConverter(this.converter);
  private docRef = (uid: string) =>
    doc(this.firestore, this.docPath(uid)).withConverter(this.converter);

  async getUser(uid: string) {
    return (await getDoc(this.docRef(uid))).data();
  }

  getUser$(uid: string) {
    return docData(this.docRef(uid));
  }

  getUsers$() {
    return collectionData(this.collectionRef);
  }

  async createUser(newUser: NewUser) {
    const docRef = await addDoc(this.collectionRef, newUser);
    return await getDoc(docRef);
  }

  async setUser(user: User) {
    await setDoc(this.docRef(user.id), user, {
      merge: true,
    });
    return await getDoc(this.docRef(user.id));
  }

  async updateUser(updatedUser: UpdatedUser) {
    await setDoc(this.docRef(updatedUser.id), updatedUser, {
      merge: true,
    });
    return await getDoc(this.docRef(updatedUser.id));
  }

  async deleteUser(uid: string) {
    return await deleteDoc(this.docRef(uid));
  }
}
