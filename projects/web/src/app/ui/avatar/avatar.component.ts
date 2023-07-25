import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaUserIconComponent } from '../icons/fontawesome/fa-user-icon/fa-user-icon.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, FaUserIconComponent],
  template: `
    <ng-container
      *ngIf="isValidImageUrl(); then validAvatar; else invalidAvatar"
    ></ng-container>

    <ng-template #validAvatar>
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img src="{{ imageUrl }}" alt="avatar image" />
        </div>
      </div>
    </ng-template>

    <ng-template #invalidAvatar>
      <div class="avatar">
        <div class="w-12 rounded-full">
          <app-fa-user-icon></app-fa-user-icon>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class AvatarComponent {
  @Input() imageUrl = '';

  isValidImageUrl = computed(() => Boolean(this.imageUrl));
}
