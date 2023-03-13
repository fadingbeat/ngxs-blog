import { GET_POSTS, POST } from './../../../config/constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CREATE_POST } from 'src/app/config/constants/constants';
import { Post } from 'src/app/components/post/models/post';
import { PageModel } from '../models/models';

export interface GetContactsQuery {
  page?: number;
  perPage?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostListService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      'Bearer d429882206b4e22bcc6f4a292b5f9cd6f4ba0911dea6c9628be3293c608f73dd4f7161dd0436aeedac28b8acd742a2d21c583c395b5f53aa2992fac03fcc2f23c0c84e8265ffaaa208b8933b48ac54ac20da310b1a8e54dd3bf12ad6646eb64244651c4dd547bca2e9b5ed5e89a06e9f161ec563916322c26f6ec29d053e41e2'
    );
  constructor(private http: HttpClient) {}

  getPosts(query?: GetContactsQuery) {
    // const contacts = data.data;
    const page = query?.page || 1;
    const perPage = query?.perPage || 5;
    const thisPageFirstIndex = (page - 1) * perPage;
    const nextPageFirstIndex = thisPageFirstIndex + perPage;
    const totalItems = 10;
    const totalPages = Math.ceil(totalItems / perPage);

    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('perPage', perPage);

    return this.http.get<PageModel<Post>>(`${environment.strapiUrl}${POST}`, {
      headers: this.headers,
    });
  }

  deletePost(id: number) {
    return this.http.delete(`${environment.strapiUrl}${POST}/${id}`, {
      headers: this.headers,
    });
  }
}
