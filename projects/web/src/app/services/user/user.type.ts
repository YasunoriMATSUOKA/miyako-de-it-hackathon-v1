export type User = {
  id: string;
  name: string;
  imageUrl: string;
  multisigAddress: string;
  multisigPublicKey: string;
  multisigEncryptedPrivateKey: string;
  cosignatoryAddress: string;
  cosignatoryPublicKey: string;
  cosignatoryEncryptedPrivateKey: string;
  salt: string;
  iv: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
export type NewUser = Omit<User, 'id'>;
export type UpdatedUser = Partial<NewUser> & { id: string };
