import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';
import { CommonModule } from '@angular/common';
import { Campaign } from './models/campaign.model';
import { CampaignsService } from './services/campaigns.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SimpleModalComponent,
    CampaignListComponent,
    CampaignFormComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'futurum-rekrutacja';
  isModalOpen = false;
  campaigns: Campaign[] = [];
  currentCampaign: Campaign | undefined = undefined;

  constructor(private campaignService: CampaignsService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe((data) => {
      this.campaigns = data;
    });
  }

  getModalTitle() {
    if (this.currentCampaign?.id) {
      return 'Edit Campaign';
    } else {
      return 'Add Campaign';
    }
  }

  handleAddCampaign(newCampaign: Campaign) {
    this.campaignService
      .createCampaign(newCampaign)
      .subscribe(() => this.loadCampaigns());
  }

  handleEditCampaign(edittedCampaignId: string, newCampaign: Campaign) {
    this.campaignService
      .updateCampaign(edittedCampaignId, newCampaign)
      .subscribe(() => this.loadCampaigns());
  }

  handleAddOrEditCampaign(newCampaign: Campaign) {
    const edittedCampaign = this.campaigns.find(
      (campaing) => campaing.id === newCampaign.id
    );

    if (edittedCampaign?.id) {
      this.handleEditCampaign(edittedCampaign.id, newCampaign);
    } else {
      this.handleAddCampaign(newCampaign);
    }
  }

  handleDeleteCampaign(id: string) {
    this.campaignService
      .deleteCampaign(id)
      .subscribe(() => this.loadCampaigns());
  }

  openEditModal(id: string) {
    this.isModalOpen = true;
    this.currentCampaign = this.campaigns.find(
      (campaign) => campaign.id === id
    );
  }
}
