import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { BlogPostService } from '../service/post.service';
import { AddBlogPost } from './post.actions';

interface BlogPostStateModel {
  selectedPost: any;
}

@State<BlogPostStateModel>({
  name: 'post',
  defaults: {
    selectedPost: {
      title: '',
      description: '',
      content: '',
    },
  },
})
@Injectable()
export class PostState {
  constructor(private blogPostService: BlogPostService) {}

  // selectors
  @Selector()
  static getSelectedPost(state: BlogPostStateModel) {
    return state.selectedPost;
  }
  // actions

  @Action(AddBlogPost)
  addBlogPost(
    { getState, setState }: StateContext<BlogPostStateModel>,
    { payload }: AddBlogPost
  ) {
    const state = getState();
    return this.blogPostService.createBlogPost(payload).pipe(
      tap((result) => {
        setState({ ...state, selectedPost: result });
      })
    );
  }
}
