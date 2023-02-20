import { PostListService } from './service/post-list.service';
import { Post } from './../post/models/post';
import { Component, OnInit } from '@angular/core';
import { PageModel } from './models/models';
import { Observable, throwError } from 'rxjs';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { MatLegacyDialog } from '@angular/material/legacy-dialog';
import { catchError, concatMap } from 'rxjs/operators';
import { ConfirmationWindowComponent } from 'src/app/shared/confirmation-window/confirmation-window.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  visibleColumns: string[] = [
    'id',
    'title',
    'description',
    'content',
    'datePosted',
    'actions',
  ];
  posts: PageModel<Post>;
  dataSource$: Observable<PageModel<Post>>;
  pageEvent: PageEvent;
  page: number;
  perPage: number;
  spinnerLoading = false;

  constructor(
    private readonly postListService: PostListService,
    private snackBar: MatLegacySnackBar,
    private router: Router,
    public dialog: MatLegacySnackBar
  ) {}

  ngOnInit(): void {
    this.spinnerLoading = true;
    this.dataSource$ = this.postListService.getPosts();
    this.getPostsData();
    this.spinnerLoading = false;
  }

  getPostsData() {
    this.dataSource$.subscribe(
      (res) => ((this.posts = res), console.log('posts', this.posts))
    );
  }

  onPaginateChange(page: PageEvent) {
    this.spinnerLoading = true;
    this.page = page.pageIndex + 1;
    this.perPage = page.pageSize;
    const getContactsQuery = {
      page: this.page,
      perPage: this.perPage,
    };

    this.dataSource$
      .pipe(
        catchError((err) => {
          this.spinnerLoading = false;
          return throwError(err);
        }),
        concatMap(() => {
          return this.postListService.getPosts(getContactsQuery);
        })
      )
      .subscribe(
        (res) => (
          (this.posts = res),
          (res.page = getContactsQuery.page),
          (res.perPage = getContactsQuery.perPage),
          (this.spinnerLoading = false)
        )
      );
  }

  // Navigate to page for adding new post
  navigateToAdd() {
    this.router.navigateByUrl(`create`);
  }
  ///// OTKOMENTIRATI KADA NAPRAVIM METODU ZA DELETE!
  // deletePost(id: number) {
  //   const dialogRef = this.dialog.open(ConfirmationWindowComponent, {
  //     width: '400px',
  //     autoFocus: false,

  //     data: {
  //       question: 'ARE YOU SURE YOU WANT TO DELETE THE CONTACT?',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result.confirmed) {
  //       this.contactsService.deleteContact(id).subscribe(() => {
  //         this.snackBar.open('CONTACT SUCCESSFULLY DELETED', 'SUCCESS', {
  //           horizontalPosition: 'center',
  //           verticalPosition: 'top',
  //           duration: 5000,
  //         });
  //       });
  //     }
  //   });
  // }

  editPost(id: number) {
    this.router.navigateByUrl(`edit/${id}`);
  }
}
