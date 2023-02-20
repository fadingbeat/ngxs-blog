import { PostListComponent } from './components/post-list/post-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheService } from './config/services/form-cache.service';
import { NgxsModule } from '@ngxs/store';
import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';
import { PostState } from './components/post/state/post.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './config/directives/highlight.directive';
import { PostComponent } from './components/post/post.component';
import { MatLegacyPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule } from '@angular/material/legacy-table';
import { MatLegacyDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([PostState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatLegacyInputModule,
    MatToolbarModule,
    MatCardModule,
    MatLegacySnackBarModule,
    MatLegacyButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatLegacyPaginatorModule,
    MatLegacyTableModule,
    MatLegacyDialogModule,
  ],
  providers: [CacheService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
