import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  // normally I would have a link like that hidden in .env file
  private apiUrl = 'http://localhost:3001/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  }

  updateCampaign(id: string, campaign: Campaign): Observable<Campaign> {
    return this.http.patch<Campaign>(`${this.apiUrl}/${id}`, campaign);
  }

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
