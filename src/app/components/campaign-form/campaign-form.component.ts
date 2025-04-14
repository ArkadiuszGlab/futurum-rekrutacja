import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from '../single-select/single-select.component';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-form',
  imports: [
    ReactiveFormsModule,
    MultiSelectComponent,
    SingleSelectComponent,
    CommonModule,
  ],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.css',
  standalone: true,
})
export class CampaignFormComponent {
  @Output() formSubmitted = new EventEmitter<Campaign>();
  @Input() editedCampaign: Campaign | undefined = undefined;
  isEdit = false;

  campaignForm = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    keywords: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    bidAmount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(50)],
    }),
    campaignFund: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl(false, {
      nonNullable: true,
    }),
    town: new FormControl('', {
      nonNullable: true,
    }),
    radius: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  ngOnInit() {
    if (this.editedCampaign) {
      this.campaignForm.patchValue({
        id: this.editedCampaign.id,
        name: this.editedCampaign.name,
        keywords: this.editedCampaign.keywords,
        bidAmount: this.editedCampaign.bidAmount,
        campaignFund: this.editedCampaign.campaignFund,
        status: this.editedCampaign.status,
        town: this.editedCampaign.town,
        radius: this.editedCampaign.radius,
      });
      this.isEdit = true;
      this.selectedKeywords = this.editedCampaign.keywords
        ? this.editedCampaign.keywords
        : [];
    }
  }

  keywords = [
    { label: 'Discount', value: 'discount' },
    { label: 'Sale', value: 'sale' },
    { label: 'New arrival', value: 'new arrival' },
    { label: 'Limited edition', value: 'limited edition' },
    { label: 'Exclusive', value: 'exclusive' },
  ];

  selectedKeywords: string[] = [];

  towns = [
    { label: 'Warsaw', value: 'Warsaw' },
    { label: 'Kraków', value: 'Kraków' },
    { label: 'Łódź', value: 'Łódź' },
    { label: 'Wrocław', value: 'Wrocław' },
    { label: 'Poznań', value: 'Poznań' },
    { label: 'Gdańsk', value: 'Gdańsk' },
    { label: 'Szczecin', value: 'Szczecin' },
    { label: 'Bydgoszcz', value: 'Bydgoszcz' },
    { label: 'Lublin', value: 'Lublin' },
    { label: 'Katowice', value: 'Katowice' },
  ];

  updateKeywords(keywords: string[]): void {
    this.campaignForm.get('keywords')?.setValue(keywords);
  }

  bidChanged(bid: number) {
    this.campaignForm.get('campaignFund')?.setValue(bid * 10);
  }

  handleSubmit() {
    if (this.isEdit === false) {
      this.campaignForm.value.id = crypto.randomUUID();
    }
    if (this.campaignForm.value.status === undefined) {
      this.campaignForm.value.status = false;
    }
    if (this.campaignForm.valid) {
      this.formSubmitted.emit(this.campaignForm.value);
    }
  }
}
