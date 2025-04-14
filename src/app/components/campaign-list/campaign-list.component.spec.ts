import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignListComponent } from './campaign-list.component';
import { Campaign } from '../../models/campaign.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campaign 1',
      keywords: ['Discount', 'Promo'],
      bidAmount: 1000,
      campaignFund: 5000,
      status: true,
      town: 'New York',
      radius: 100,
    },
    {
      id: '2',
      name: 'Campaign 2',
      keywords: ['Fashion', 'Summer'],
      bidAmount: 1500,
      campaignFund: 7000,
      status: false,
      town: 'Los Angeles',
      radius: 50,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CampaignListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of campaigns', () => {
    component.campaigns = mockCampaigns;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(mockCampaigns.length + 1);
  });

  it('should call deleteCampaignEmitter when the delete button is clicked', () => {
    spyOn(component.deleteCampaignEmitter, 'emit');

    component.campaigns = mockCampaigns;
    fixture.detectChanges();

    const deleteButtons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button')
    );
    deleteButtons[1].nativeElement.click();

    expect(component.deleteCampaignEmitter.emit).toHaveBeenCalledWith('1');
  });

  it('should call editCampaignEmitter when the edit button is clicked', () => {
    spyOn(component.editCampaignEmitter, 'emit');

    component.campaigns = mockCampaigns;
    fixture.detectChanges();

    const editButtons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button')
    );
    editButtons[0].nativeElement.click();

    expect(component.editCampaignEmitter.emit).toHaveBeenCalledWith('1');
  });

  it('should display correct campaign details in the table', () => {
    component.campaigns = mockCampaigns;
    fixture.detectChanges();

    const campaignRows = fixture.debugElement.queryAll(By.css('tr'));

    const firstRowCells = campaignRows[1].nativeElement.cells;

    expect(firstRowCells[0].textContent).toContain('Campaign 1');
    expect(firstRowCells[1].textContent).toContain('Discount Promo');
    expect(firstRowCells[2].textContent).toContain('1000');
    expect(firstRowCells[3].textContent).toContain('5000');
    expect(firstRowCells[4].textContent).toContain('on');
    expect(firstRowCells[5].textContent).toContain('New York');
    expect(firstRowCells[6].textContent).toContain('100');
  });
});
