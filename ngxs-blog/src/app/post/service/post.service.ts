import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { BLOG_POST } from 'src/app/config/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  createBlogPost(payload: Post) {
    return this.http.post(`${environment.mockUrl}${BLOG_POST}`, payload);
  }
}
