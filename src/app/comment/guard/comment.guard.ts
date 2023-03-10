import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Comment} from "../comment";
import {CommentService} from "../comment.service";

@Injectable({
  providedIn: 'root'
})
export class CommentGuard implements Resolve<Comment[]> {

  constructor(
    private commentService: CommentService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comment[]> | Promise<Comment[]> | Comment[] {
    return this.commentService.getComments();
  }
}
