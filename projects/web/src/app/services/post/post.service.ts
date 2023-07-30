import { Injectable, inject } from '@angular/core';

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
import { Post, NewPost, UpdatedPost } from './post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private firestore = inject(Firestore);

  collectionPath = (dogId: string) => `/dogs/${dogId}/posts`;
  docPath = (dogId: string, postId: string) =>
    `${this.collectionPath(dogId)}/${postId}`;
  converter = {
    toFirestore: (post: Post) => post,
    fromFirestore: (snapshot: any) => {
      const firestorePost = snapshot.data();
      firestorePost.createdAt = firestorePost.createdAt.toDate();
      firestorePost.updatedAt = firestorePost.updatedAt?.toDate();
      firestorePost.deletedAt = firestorePost.deletedAt?.toDate();
      return firestorePost as Post;
    },
  };
  private collectionRef = (dogId: string) =>
    collection(this.firestore, this.collectionPath(dogId)).withConverter(
      this.converter,
    );
  private docRef = (dogId: string, postId: string) =>
    doc(this.collectionRef(dogId), postId).withConverter(this.converter);

  async getPost(dogId: string, postId: string) {
    return (await getDoc(this.docRef(dogId, postId))).data();
  }

  getPost$(dogId: string, postId: string) {
    return docData(this.docRef(dogId, postId));
  }

  getPosts$(dogId: string) {
    return collectionData(this.collectionRef(dogId));
  }

  async createPost(dogId: string, newPost: NewPost) {
    const id = doc(this.collectionRef(dogId)).id;
    await setDoc(this.docRef(dogId, id), { id, ...newPost });
    return (await getDoc(this.docRef(dogId, id))).data();
  }

  async updatePost(dogId: string, updatedPost: UpdatedPost) {
    await setDoc(this.docRef(dogId, updatedPost.id), updatedPost, {
      merge: true,
    });
    return await getDoc(this.docRef(dogId, updatedPost.id));
  }

  async deletePost(dogId: string, postId: string) {
    return await deleteDoc(this.docRef(dogId, postId));
  }

  async queryPostsByDogId(dogId: string) {
    return (
      await getDocs(
        query(this.collectionRef(dogId), where('dogId', '==', dogId)),
      )
    ).docs.map((snapshot) => snapshot.data());
  }
}
