import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
// import { AngularFirestore } from '@angular/fire/firestore';
import { CacheService } from '../config/services/form-cache.service';
import { Post } from './models/post';
import { AddBlogPost } from './state/post.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  // @Input() post: Post | null = null;
  // @Output() edit = new EventEmitter<Post>();
  // @Input() form: FormGroup;
  public postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private fireStore: AngularFirestore,
    private snackBar: MatSnackBar,
    private cacheService: CacheService
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
    // this.form.patchValue(this.cacheService.getFormData());
  }

  public ngOnDestroy(): void {
    // this.cacheService.setFormData(this.form.value);
  }

  onSave() {
    // this.fireStore
    //   .collection('blog-posts')
    //   .valueChanges({ title: 'Jest' }) as any;
    this.store.dispatch(new AddBlogPost(this.postForm.value)).subscribe(() => {
      this.snackBar.open('POST ADDED', 'SUCCESS', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });

      // this.router.navigateByUrl(`search`);
    });
  }
}
