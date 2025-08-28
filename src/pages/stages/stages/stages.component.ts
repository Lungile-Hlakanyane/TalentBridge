import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/Candidate';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.scss'
})
export class StagesComponent implements OnInit{

 stages = [
    { name: 'Interview', candidates: [] as Candidate[] },
    { name: 'Background Check', candidates: [] as Candidate[] },
    { name: 'Decline', candidates: [] as Candidate[] },
    { name: 'Letter Offered', candidates: [] as Candidate[] }
  ];

  stageIds: string[] = [];
  showModal = false;
  newStageName = '';

  constructor(private location: Location) {
    this.stages[0].candidates = [
      { id: 1, name: 'Alice Johnson', email: 'alice@mail.com', appliedFor: 'Frontend Developer' }
    ];
  }

  ngOnInit() {
    this.updateStageIds();
  }

  drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  goBack(){
    this.location.back();
  }

  private updateStageIds() {
    this.stageIds = this.stages.map((_, i) => `stage-${i}`);
  }

  createStage() {
    const stageName = prompt('Enter new stage name:');
    if (stageName && stageName.trim()) {
      this.stages.push({ name: stageName.trim(), candidates: [] });
      this.updateStageIds();
    }
  }

  openModal() {
    this.newStageName = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveStage() {
    if (this.newStageName.trim()) {
      this.stages.push({ name: this.newStageName.trim(), candidates: [] });
      this.updateStageIds();
      this.closeModal();
    }
  }

}
