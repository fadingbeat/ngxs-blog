import { Post } from './../models/post';
import { GET_POSTS, POST } from './../../../config/constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CREATE_POST } from 'src/app/config/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      'Bearer d429882206b4e22bcc6f4a292b5f9cd6f4ba0911dea6c9628be3293c608f73dd4f7161dd0436aeedac28b8acd742a2d21c583c395b5f53aa2992fac03fcc2f23c0c84e8265ffaaa208b8933b48ac54ac20da310b1a8e54dd3bf12ad6646eb64244651c4dd547bca2e9b5ed5e89a06e9f161ec563916322c26f6ec29d053e41e2'
    );
  constructor(private http: HttpClient) {}

  createBlogPost(payload: Post) {
    return this.http.post(
      `${environment.strapiUrl}${POST}`,
      { data: payload },
      {
        headers: this.headers,
      }
    );
  }

  editBlogPost(payload: Post, id: number) {
    return this.http.put(
      `${environment.strapiUrl}${POST}/${id}`,
      { data: payload },
      { headers: this.headers }
    );
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${environment.strapiUrl}${POST}/${id}`, {
      headers: this.headers,
    });
  }
}
