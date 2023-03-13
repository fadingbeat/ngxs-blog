import { PostListService } from './../../post-list/service/post-list.service';
import { TableInfo } from './../../post-list/models/models';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Post } from '../models/post';
import { BlogPostService } from '../service/post.service';
import {
  AddBlogPost,
  UpdateBlogPost,
  GetPosts,
  DeletePost,
  GetPostById,
} from './post.actions';
import { tap } from 'rxjs/operators';

export interface BlogPostStateModel {
  posts: any;
  selectedPost: Post;
  tableData: TableInfo;
}

@State<BlogPostStateModel>({
  name: 'post',
  defaults: {
    posts: [],
    selectedPost: {
      id: 0,
      attributes: {
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        title: '',
        content: '',
        description: '',
      },
    },
    tableData: {
      page: 1,
      pageCount: 5,
      pageSize: 10,
      total: 0,
    },
  },
})
@Injectable()
export class PostState {
  constructor(
    private blogPostService: BlogPostService,
    private postListService: PostListService
  ) {}

  // selectors
  // @Selector()
  // static getPostList(state: BlogPostStateModel) {
  //   return state.posts;
  // }
  @Selector()
  static getSelectedPost(state: BlogPostStateModel) {
    return state.selectedPost;
  }
  // actions

  @Action(AddBlogPost)
  addBlogPost(ctx: StateContext<BlogPostStateModel>, action: AddBlogPost) {
    const state = ctx.getState();
    console.log('state', state);
    ctx.setState({
      ...state,
      selectedPost: action.payload,
    });
    return this.blogPostService.createBlogPost(action.payload);
  }

  @Action(UpdateBlogPost)
  editBlogPost(ctx: StateContext<BlogPostStateModel>, action: UpdateBlogPost) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedPost: action.payload,
    });
    return this.blogPostService.editBlogPost(action.payload, action.id);
  }

  @Action(GetPosts)
  getPosts({ getState, setState }: StateContext<BlogPostStateModel>) {
    const state = getState();
    return this.postListService.getPosts(state.tableData).pipe(
      tap((result) => {
        setState({ ...state, posts: result });
      })
    );
  }

  @Action(GetPostById)
  getPostById(
    { getState, setState }: StateContext<BlogPostStateModel>,
    { id }: GetPostById
  ) {
    return this.blogPostService.getPostById(id).pipe(
      tap((result: Post) => {
        const state = getState();
        setState({
          ...state,
          selectedPost: result,
        });
      })
    );
  }

  @Action(DeletePost)
  deletePost(
    { getState, setState }: StateContext<BlogPostStateModel>,
    { id }: { id: number }
  ) {
    return this.postListService.deletePost(id).pipe(
      tap(() => {
        const state = getState();
        setState({ ...state });
      })
    );
  }
}
