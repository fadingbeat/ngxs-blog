import { Post } from '../models/post';

export class AddBlogPost {
  static readonly type = '[Create Post] Add';
  constructor(public payload: Post) {}
}

export class UpdateBlogPost {
  static readonly type = '[Update Post] Edit';
  constructor(public payload: Post, public id: number) {}
}

export class GetPosts {
  static readonly type = '[Posts] Get';

  constructor() {}
}

export class DeletePost {
  static readonly type = '[Post] Delete';

  constructor(public id: number) {}
}

export class TableData {
  static readonly type = '[Posts] TableData';

  constructor(
    public page: number,
    public size: number,
    public id: number,
    public title: string,
    public description: string,
    public content: string,
    public datePosted: string
  ) {}
}
