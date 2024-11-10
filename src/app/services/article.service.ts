import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Adjust the URL as needed to point to your backend
  private urlArticles = 'http://localhost:8080/articles'; 

  constructor(private Http: HttpClient) { }

  // Method to get all articles
  listArticles(): Observable<any> {
    return this.Http.get(`${this.urlArticles}/list`);
  }

  // Method to create a new article
  createArticle(articleForm: any): Observable<any> {
    const article = {
      label: articleForm.value.articleLabel,
      price: articleForm.value.articlePrice,
      picture: articleForm.value.articlePicture,
      providerId: articleForm.value.providerId,
    };
    return this.Http.post(`${this.urlArticles}/add/${articleForm.value.providerId}`, article);
  }

  // Method to update an existing article
  updateArticle(article: any): Observable<any> {
    return this.Http.put(`${this.urlArticles}/update/${article.providerId}/${article.id}`, article);
  }

  // Method to delete an article by its ID
  deleteArticle(articleId: string): Observable<any> {
    return this.Http.delete(`${this.urlArticles}/delete/${articleId}`);
  }

  // Method to get a single article by its ID
  getArticle(id: string): Observable<any> {
    return this.Http.get(`${this.urlArticles}/details/${id}`);
  }
}
