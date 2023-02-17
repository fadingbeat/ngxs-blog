import { Post } from '../models/post';

export class AddBlogPost {
  static readonly type = '[Create Post] Add';
  constructor(public payload: Post) {}
}

export class UpdateBlogPost {
  static readonly type = '[Update Post] Edit';
  constructor(public payload: Post, public id: number) {}
}
