import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/lib/firestore';

export const converter = <
  T extends Record<string, unknown>,
>(): FirestoreDataConverter<T> => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
      const data = snapshot.data();
      const cloneObj = Object.assign(data);
      Object.keys(cloneObj).forEach((key) => {
        // Note: ServerTimestamp型のプロパティをDate型に変換する
        // Note: ServerTimestamp型の判定は、toString, toDateメソッドが存在するかで行う
        if (
          typeof cloneObj[key]?.toString === 'function' &&
          typeof cloneObj[key]?.toDate === 'function'
        ) {
          cloneObj[key] = cloneObj[key].toDate();
        }
      });
      return cloneObj;
    },
  };
};
