import { Component, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as EventEmitter from 'events';
import { Post } from './post/models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngxs-blog';
}
