import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CampaignsService } from './services/campaigns.service';
import { of } from 'rxjs';
import { Campaign } from './models/campaign.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockCampaignService: jasmine.SpyObj<CampaignsService>;

  const fakeCampaigns: Campaign[] = [
    {
      id: 'str123',
      name: 'camp 13000',
      keywords: [
        'discount',
        'sale',
        'new arrival',
        'limited edition',
        'exclusive',
      ],
      bidAmount: 500000,
      campaignFund: 5000000,
      status: false,
      town: 'Warsaw',
      radius: 20,
    },
    {
      id: 'str125',
      name: 'camp 3',
      keywords: ['clothes', 'fashion', 'design'],
      bidAmount: 2500,
      campaignFund: 500,
      status: true,
      town: 'Łódź',
      radius: 20,
    },
  ];

  beforeEach(async () => {
    mockCampaignService = jasmine.createSpyObj('CampaignsService', [
      'getCampaigns',
      'createCampaign',
      'updateCampaign',
      'deleteCampaign',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: CampaignsService, useValue: mockCampaignService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    mockCampaignService.getCampaigns.and.returnValue(of(fakeCampaigns));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCampaigns on init', () => {
    mockCampaignService.getCampaigns.and.returnValue(of(fakeCampaigns));

    component.ngOnInit();

    expect(mockCampaignService.getCampaigns).toHaveBeenCalled();
    expect(component.campaigns.length).toBe(2);
  });

  it('should call handleEditCampaign if campaign exists', () => {
    const updated = {
      id: 'str123',
      name: 'Updated Campaign',
      bidAmount: 600000,
    };
    component.campaigns = fakeCampaigns;

    mockCampaignService.updateCampaign.and.returnValue(of({}));
    mockCampaignService.getCampaigns.and.returnValue(of(fakeCampaigns));

    component.handleAddOrEditCampaign(updated);

    expect(mockCampaignService.updateCampaign).toHaveBeenCalledWith(
      'str123',
      updated
    );
    expect(mockCampaignService.getCampaigns).toHaveBeenCalled();
  });

  it('should return "Edit Campaign" if currentCampaign has id', () => {
    component.currentCampaign = fakeCampaigns[0];
    expect(component.getModalTitle()).toBe('Edit Campaign');
  });

  it('should return "Add Campaign" if no currentCampaign or no id', () => {
    component.currentCampaign = undefined;
    expect(component.getModalTitle()).toBe('Add Campaign');
  });

  it('should call createCampaign and reload campaigns', () => {
    const newCampaign = fakeCampaigns[0];
    mockCampaignService.createCampaign.and.returnValue(of({}));
    mockCampaignService.getCampaigns.and.returnValue(of(fakeCampaigns));

    component.handleAddCampaign(newCampaign);

    expect(mockCampaignService.createCampaign).toHaveBeenCalledWith(
      newCampaign
    );
    expect(mockCampaignService.getCampaigns).toHaveBeenCalled();
  });

  it('should delete campaign and reload', () => {
    component.campaigns = fakeCampaigns;

    mockCampaignService.deleteCampaign.and.returnValue(of(void 0));
    mockCampaignService.getCampaigns.and.returnValue(of([]));

    component.handleDeleteCampaign('str123');

    expect(mockCampaignService.getCampaigns).toHaveBeenCalled();
  });

  it('should call handleAddCampaign if campaign does not exist', () => {
    const newCampaign = { ...fakeCampaigns[0], id: '123' };
    component.campaigns = fakeCampaigns;
    spyOn(component, 'handleAddCampaign');

    component.handleAddOrEditCampaign(newCampaign);

    expect(component.handleAddCampaign).toHaveBeenCalledWith(newCampaign);
  });
});
