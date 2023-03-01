import { PostState } from './state/post.state';
import { BlogPostService } from './service/post.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Post } from './models/post';
import { AddBlogPost, UpdateBlogPost } from './state/post.actions';
import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StateReset } from 'ngxs-reset-plugin';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  selectedPostId: number;
  selectedPost: Observable<Post>;
  editPost: boolean = false;
  public postForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private snackBar: MatLegacySnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private postService: BlogPostService
  ) {
    this.createPostForm();
  }

  createPostForm() {
    this.postForm = this.fb.group({
      title: [''],
      description: [''],
      content: [''],
    });
  }

  ngOnInit() {
    this.store.dispatch(new StateReset(PostState));
    const routeParams = this.route.snapshot.params;
    this.selectedPostId = Number(routeParams.id);

    const editMode = this.router.url.startsWith('/edit');
    if (editMode) {
      this.selectedPost = this.postService.getPostById(this.selectedPostId);

      this.selectedPost.subscribe((res: Post) => {
        this.editPost = true;
        this.editSelectedPost(res);
      });
    }
  }

  editSelectedPost(post: Post) {
    this.postForm.patchValue({
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
    });
  }

  public ngOnDestroy(): void {
    // this.cacheService.setFormData(this.form.value);
  }

  onSave() {
    if (this.editPost) {
      this.store
        .dispatch(new UpdateBlogPost(this.postForm.value, this.selectedPostId))
        .subscribe(() => {
          this.snackBar.open('POST UPDATED', 'SUCCESS', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        });
    } else {
      this.store
        .dispatch(new AddBlogPost(this.postForm.value))
        .subscribe(() => {
          this.snackBar.open('POST ADDED', 'SUCCESS', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        });
    }
    this.router.navigateByUrl(`home`);
  }
}
