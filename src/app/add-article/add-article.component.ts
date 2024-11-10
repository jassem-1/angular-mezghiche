import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      articleLabel: ['', Validators.required],
      articlePrice: ['', [Validators.required, Validators.min(0)]],
      articlePicture: ['', Validators.required],
      providerId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.articleService.createArticle(this.articleForm).subscribe(
        (response) => {
          console.log('Article added:', response);
          this.router.navigate(['/']); // Navigate to article list after adding
        },
        (error) => {
          console.error('Error adding article:', error);
        }
      );
    }
  }
}
