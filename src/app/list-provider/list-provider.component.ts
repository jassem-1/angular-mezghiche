import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/providers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit {
  providers: any;
  editForm: FormGroup;
  selectedProvider: any;
  showEditModal = false;
  showDeleteModal = false;

  constructor(
    private providerService: ProviderService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
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

  openEditModal(provider: any) {
    this.selectedProvider = provider;
    this.editForm.patchValue({
      name: provider.name,
      email: provider.email,
      address: provider.address,
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveChanges() {
    const updatedProvider = { ...this.selectedProvider, ...this.editForm.value };
    this.providerService.updateProvider(updatedProvider).subscribe(() => {
      this.fetchProviders();
      this.closeEditModal();
    });
  }

  openDeleteModal(provider: any) {
    this.selectedProvider = provider;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.providerService.deleteProvider(this.selectedProvider).subscribe(() => {
      this.fetchProviders();
      this.closeDeleteModal();
    });
  }
}
