import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { BlogPostService } from '../service/post.service';
import { AddBlogPost, UpdateBlogPost } from './post.actions';

export interface BlogPostStateModel {
  selectedPost: Post[];
}

@State<BlogPostStateModel>({
  name: 'post',
  defaults: {
    selectedPost: [],
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

  // @Action(AddBlogPost)
  // addBlogPost(
  //   { getState, setState }: StateContext<BlogPostStateModel>,
  //   { payload }: AddBlogPost
  // ) {
  //   const state = getState();
  //   return this.blogPostService.createBlogPost(payload).pipe(
  //     tap((result) => {
  //       setState({ ...state, selectedPost: result });
  //     })
  //   );
  // }

  @Action(AddBlogPost)
  addBlogPost(ctx: StateContext<BlogPostStateModel>, action: AddBlogPost) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedPost: [...state.selectedPost, action.payload],
    });
    return this.blogPostService.createBlogPost(action.payload);
  }

  @Action(UpdateBlogPost)
  editBlogPost(ctx: StateContext<BlogPostStateModel>, action: UpdateBlogPost) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedPost: [...state.selectedPost, action.payload],
    });
    return this.blogPostService.editBlogPost(action.payload, action.id);
  }
}
