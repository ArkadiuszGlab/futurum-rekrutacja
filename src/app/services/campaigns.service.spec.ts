import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CampaignsService } from './campaigns.service';
import { Campaign } from '../models/campaign.model';

describe('CampaignsService', () => {
  let service: CampaignsService;
  let httpMock: HttpTestingController;

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campaign 1',
      keywords: ['Sale'],
      bidAmount: 100,
      campaignFund: 1000,
      status: true,
      town: 'Warsaw',
      radius: 10,
    },
    {
      id: '2',
      name: 'Campaign 2',
      keywords: ['Discount'],
      bidAmount: 200,
      campaignFund: 2000,
      status: true,
      town: 'Kraków',
      radius: 20,
    },
  ];

  const mockCampaign: Campaign = {
    id: '1',
    name: 'New Campaign',
    keywords: ['Sale'],
    bidAmount: 150,
    campaignFund: 1500,
    status: true,
    town: 'Warsaw',
    radius: 15,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CampaignsService],
    });

    service = TestBed.inject(CampaignsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCampaigns', () => {
    it('should fetch campaigns', () => {
      service.getCampaigns().subscribe((campaigns) => {
        expect(campaigns.length).toBe(2);
        expect(campaigns).toEqual(mockCampaigns);
      });

      const req = httpMock.expectOne('http://localhost:3001/campaigns');
      expect(req.request.method).toBe('GET');
      req.flush(mockCampaigns);
    });
  });

  describe('createCampaign', () => {
    it('should create a new campaign', () => {
      service.createCampaign(mockCampaign).subscribe((campaign) => {
        expect(campaign).toEqual(mockCampaign);
      });

      const req = httpMock.expectOne('http://localhost:3001/campaigns');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCampaign);
      req.flush(mockCampaign);
    });
  });

  describe('updateCampaign', () => {
    it('should update an existing campaign', () => {
      service.updateCampaign('1', mockCampaign).subscribe((campaign) => {
        expect(campaign).toEqual(mockCampaign);
      });

      const req = httpMock.expectOne('http://localhost:3001/campaigns/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(mockCampaign);
      req.flush(mockCampaign);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete an existing campaign', () => {
      service.deleteCampaign('1').subscribe((response) => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne('http://localhost:3001/campaigns/1');
      expect(req.request.method).toBe('DELETE');

      httpMock.verify();
    });
  });
});
