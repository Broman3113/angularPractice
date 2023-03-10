import {Component} from '@angular/core';
import {CommentService} from "./comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "./comment";
import {Observable, pluck} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'ngp-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  // In comment component, we use the resolve guard to get the comments data from the server before the component is rendered.

  // comments: Comment[] = []; // This is the old way to get the data from the server

  // comments$ : Observable<Comment[]> = this.route.data.pipe(pluck('comments')); // pluck has been deprecated since RxJS version 7.0.0 and has been replaced by the map operator.

  comments$: Observable<Comment[]> = this.route.data.pipe(map(data => data['comments']));

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.route.data.subscribe(data => {
    //   this.comments = data['comments'];
    // }) // This is the old way to get the data from the server
  }
}
