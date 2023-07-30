export type Dog = {
  id: string;
  name: string;
  dogMultisigAddress?: string;
  dogMultisigPublicKey?: string;
  dogMultisigEncryptedPrivateKey?: string;
  registrationNumber: string;
  breed: string;
  gender: string;
  color: string;
  father: string;
  mother: string;
  birthDate: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  ownerUserId: string;
};
export type NewDog = Omit<
  Dog,
  | 'id'
  | 'dogMultisigAddress'
  | 'dogMultisigPublicKey'
  | 'dogMultisigEncryptedPrivateKey'
>;
export type UpdatedDog = Partial<Omit<Dog, 'id'>> & { id: string };
