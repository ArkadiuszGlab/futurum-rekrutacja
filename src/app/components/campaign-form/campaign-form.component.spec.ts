import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignFormComponent } from './campaign-form.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { SingleSelectComponent } from '../single-select/single-select.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Campaign } from '../../models/campaign.model';

describe('CampaignFormComponent', () => {
  let component: CampaignFormComponent;
  let fixture: ComponentFixture<CampaignFormComponent>;

  const mockCampaign: Campaign = {
    id: '1',
    name: 'Campaign 1',
    keywords: ['Discount', 'Promo'],
    bidAmount: 1000,
    campaignFund: 5000,
    status: true,
    town: 'Warsaw',
    radius: 100,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CampaignFormComponent,
        MultiSelectComponent,
        SingleSelectComponent,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in edit mode with campaign data', () => {
    component.editedCampaign = mockCampaign;
    fixture.detectChanges();

    expect(component.campaignForm.value.name).toBe('Campaign 1');
    expect(component.campaignForm.value.keywords).toEqual([
      'Discount',
      'Promo',
    ]);
    expect(component.isEdit).toBe(true);
  });

  it('should emit form data on submit', () => {
    spyOn(component.formSubmitted, 'emit');
    const originalUUID = globalThis.crypto.randomUUID;
    spyOn(globalThis.crypto, 'randomUUID').and.returnValue(
      '123e4567-e89b-12d3-a456-426614174000'
    );

    component.campaignForm.setValue({
      id: '',
      name: 'New Campaign',
      keywords: ['Sale', 'Exclusive'],
      bidAmount: 500,
      campaignFund: 5000,
      status: true,
      town: 'Kraków',
      radius: 50,
    });
    fixture.detectChanges();

    component.handleSubmit();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'New Campaign',
      keywords: ['Sale', 'Exclusive'],
      bidAmount: 500,
      campaignFund: 5000,
      status: true,
      town: 'Kraków',
      radius: 50,
    });

    globalThis.crypto.randomUUID = originalUUID;
  });

  it('should disable submit button when the form is invalid', () => {
    component.campaignForm.setValue({
      id: '1',
      name: '',
      keywords: [],
      bidAmount: 0,
      campaignFund: 0,
      status: false,
      town: '',
      radius: 0,
    });

    fixture.detectChanges();
    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(submitButton.nativeElement.disabled).toBe(true);
  });

  it('should display the correct button text for editing or adding campaign', () => {
    component.isEdit = false;
    fixture.detectChanges();
    let submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(submitButton.nativeElement.textContent.trim()).toBe('Add campaign');

    component.isEdit = true;
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.textContent.trim()).toBe('Edit campaign');
  });

  it('should not submit the form if the form is invalid', () => {
    spyOn(component.formSubmitted, 'emit');

    component.campaignForm.setValue({
      id: '1',
      name: '',
      keywords: [],
      bidAmount: 0,
      campaignFund: 0,
      status: false,
      town: '',
      radius: 0,
    });
    fixture.detectChanges();

    component.handleSubmit();

    expect(component.formSubmitted.emit).not.toHaveBeenCalled();
  });

  it('should update campaign fund when bid amount changes', () => {
    spyOn(component.formSubmitted, 'emit');

    const originalUUID = globalThis.crypto.randomUUID;
    spyOn(globalThis.crypto, 'randomUUID').and.returnValue(
      '123e4567-e89b-12d3-a456-426614174000'
    );

    component.campaignForm.setValue({
      id: '',
      name: 'New Campaign',
      keywords: ['Sale', 'Exclusive'],
      bidAmount: 500,
      campaignFund: 0,
      status: true,
      town: 'Kraków',
      radius: 50,
    });

    expect(component.campaignForm.valid).toBe(
      true,
      'The form should be valid before submitting'
    );

    component.bidChanged(component.campaignForm.value.bidAmount ?? 0);

    fixture.detectChanges();

    expect(component.campaignForm.value.campaignFund).toBe(5000);

    expect(component.campaignForm.valid).toBe(
      true,
      'The form should be valid after updating bid amount'
    );

    component.handleSubmit();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'New Campaign',
      keywords: ['Sale', 'Exclusive'],
      bidAmount: 500,
      campaignFund: 5000,
      status: true,
      town: 'Kraków',
      radius: 50,
    });

    globalThis.crypto.randomUUID = originalUUID;
  });

  it('should update keywords when multi-select changes', () => {
    spyOn(component.formSubmitted, 'emit');

    const originalUUID = globalThis.crypto.randomUUID;
    spyOn(globalThis.crypto, 'randomUUID').and.returnValue(
      '123e4567-e89b-12d3-a456-426614174000'
    );

    component.campaignForm.setValue({
      id: '',
      name: 'New Campaign',
      keywords: [],
      bidAmount: 500,
      campaignFund: 5000,
      status: true,
      town: 'Kraków',
      radius: 50,
    });

    const selectedOptions = ['Sale', 'Exclusive'];
    component.updateKeywords(selectedOptions);

    fixture.detectChanges();

    expect(component.campaignForm.value.keywords?.length).toBe(2);
    expect(component.campaignForm.value.keywords?.[0]).toBe('Sale');
    expect(component.campaignForm.value.keywords?.[1]).toBe('Exclusive');

    component.handleSubmit();

    expect(component.formSubmitted.emit).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'New Campaign',
      keywords: ['Sale', 'Exclusive'],
      bidAmount: 500,
      campaignFund: 5000,
      status: true,
      town: 'Kraków',
      radius: 50,
    });

    globalThis.crypto.randomUUID = originalUUID;
  });

  it('should switch to edit mode and load the campaign data', () => {
    component.editedCampaign = mockCampaign;
    fixture.detectChanges();

    expect(component.campaignForm.get('name')?.value).toBe(mockCampaign.name);
    expect(component.campaignForm.get('keywords')?.value).toEqual(
      mockCampaign.keywords
    );
    expect(component.campaignForm.get('status')?.value).toBe(
      mockCampaign.status
    );
    expect(component.isEdit).toBe(true);
  });
});
