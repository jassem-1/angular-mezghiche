import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  urlArticles = 'http://localhost:8080/articles'; // Adjust the URL as needed

  constructor(private Http: HttpClient) { }

  listArticles(): Observable<any> {
    return this.Http.get(this.urlArticles + '/list');
  }

  createArticle(articleForm: any): Observable<any> {
    const article = {
      label: articleForm.value.articleLabel,
      price: articleForm.value.articlePrice,
      picture: articleForm.value.articlePicture,
      providerId: articleForm.value.providerId,
    };
    return this.Http.post(this.urlArticles + '/add/' + articleForm.value.providerId, article);
  }

  updateArticle(article: any): Observable<any> {
    return this.Http.put(this.urlArticles + '/update/' + article.providerId + '/' + article.id, article);
  }

  deleteArticle(articleId: string): Observable<any> {
    return this.Http.delete(this.urlArticles + '/delete/' + articleId);
  }

  getArticle(id: string): Observable<any> {
    return this.Http.get(this.urlArticles + '/details/' + id);
  }
}
