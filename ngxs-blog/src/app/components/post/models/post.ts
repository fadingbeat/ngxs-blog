export interface Post {
  id?: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    description: string;
    content: string;
    // datePosted: Date;
  };
}
