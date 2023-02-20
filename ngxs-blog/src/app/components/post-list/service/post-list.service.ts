import { GET_POSTS } from './../../../config/constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    return this.http.get<PageModel<Post>>(
      `${environment.mockUrl}${GET_POSTS}`,
      {
        params,
      }
    );
  }

  deletePost(id: number) {
    return this.http.delete(`${environment.mockUrl}${GET_POSTS}/${id}`);
  }
}
