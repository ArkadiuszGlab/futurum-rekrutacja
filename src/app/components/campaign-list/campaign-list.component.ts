import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-list',
  imports: [],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css',
})
export class CampaignListComponent {
  @Input() campaigns: Campaign[] = [];
  @Output() deleteCampaignEmitter = new EventEmitter<string>();
  @Output() editCampaignEmitter = new EventEmitter<string>();

  deleteCampaign(id: string | undefined) {
    this.deleteCampaignEmitter.emit(id);
  }

  editCampaign(id: string | undefined) {
    this.editCampaignEmitter.emit(id);
  }
}
