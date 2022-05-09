import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input-modal',
  templateUrl: './text-input-modal.component.html',
  styleUrls: ['./text-input-modal.component.scss']
})
export class TextInputModalComponent {
  @Input() public openned: boolean;
  @Input() public content: string;
  @Input() public placeholder: string;
  @Output() closed = new EventEmitter<boolean>();
  @Output() newContent = new EventEmitter<{ content: string; shouldSend: boolean }>();

  public myContent: string;
  constructor() {}

  public closeModal(shouldSend: boolean, content: string) {
    this.newContent.emit({ content, shouldSend });
  }
}
