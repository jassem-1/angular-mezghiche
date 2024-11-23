import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProviderService } from '../services/providers.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  providers: any;
  articleForm: FormGroup;

  constructor(
    private providerService: ProviderService,

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

  ngOnInit(): void {
    this.fetchProviders();
  }

  fetchProviders() {
    this.providerService.listProviders().subscribe(data => {
      this.providers = data;
    });
  }
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
