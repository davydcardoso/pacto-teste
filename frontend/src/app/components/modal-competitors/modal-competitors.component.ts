import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserModule } from '../../core/domain/user.module';

@Component({
  selector: 'app-modal-competitors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-competitors.component.html',
})
export class ModalCompetitorsComponent {
  @Input() isVisible: boolean = false;
  @Input() competitors: UserModule[] | undefined = [];

  closeModal() {
    this.isVisible = !this.isVisible;
  }
}
