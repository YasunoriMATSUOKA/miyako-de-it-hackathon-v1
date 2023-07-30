export type Post = {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId?: string;
  dogId?: string;
};
export type NewPost = Omit<Post, 'id'>;
export type UpdatedPost = Partial<Omit<Post, 'id'>> & { id: string };
