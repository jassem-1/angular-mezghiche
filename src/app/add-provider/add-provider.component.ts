import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../services/providers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
  providerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router
  ) {
    this.providerForm = this.fb.group({
      providerName: ['', Validators.required],
      providerEmail: ['', [Validators.required, Validators.email]],
      providerAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.providerForm.valid) {
      this.providerService.createProvider(this.providerForm).subscribe(
        (response) => {
          console.log('Provider added:', response);
          this.router.navigate(['/']); // Navigate to provider list after adding
        },
        (error) => {
          console.error('Error adding provider:', error);
        }
      );
    }
  }
}
