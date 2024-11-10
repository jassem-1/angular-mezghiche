import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles: any;
  editForm: FormGroup;
  selectedArticle: any;
  showEditModal = false;
  showDeleteModal = false;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      label: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      picture: ['', Validators.required],
      providerId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService.listArticles().subscribe(data => {
      this.articles = data;
    });
  }

  openEditModal(article: any) {
    this.selectedArticle = article;
    this.editForm.patchValue({
      label: article.label,
      price: article.price,
      picture: article.picture,
      providerId: article.providerId,
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveChanges() {
    const updatedArticle = { ...this.selectedArticle, ...this.editForm.value };
    this.articleService.updateArticle(updatedArticle).subscribe(() => {
      this.fetchArticles();
      this.closeEditModal();
    });
  }

  openDeleteModal(article: any) {
    this.selectedArticle = article;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.articleService.deleteArticle(this.selectedArticle.id).subscribe(() => {
      this.fetchArticles();
      this.closeDeleteModal();
    });
  }
}
