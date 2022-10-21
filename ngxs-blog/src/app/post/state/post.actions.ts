import { Post } from '../models/post';

export class AddBlogPost {
  static readonly type = '[Create Post] Add';
  constructor(public payload: Post) {}
}
