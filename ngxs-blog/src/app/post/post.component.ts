import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from './models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  @Output() edit = new EventEmitter<Post>();
  @Input() form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  createPostForm() {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      content: [''],
    });
  }
}
