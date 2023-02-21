import { Post } from './../models/post';
import { GET_POSTS } from './../../../config/constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CREATE_POST } from 'src/app/config/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  createBlogPost(payload: Post) {
    return this.http.post(`${environment.mockUrl}${CREATE_POST}`, payload);
  }

  editBlogPost(payload: Post, id: number) {
    return this.http.put(`${environment.mockUrl}${GET_POSTS}/${id}`, payload);
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${environment.mockUrl}${GET_POSTS}/${id}`);
  }
}
