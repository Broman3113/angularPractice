import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) { }

  getComments() {
    return this.http.get<Comment[]>('https://jsonplaceholder.typicode.com/commentss');
  }
}
