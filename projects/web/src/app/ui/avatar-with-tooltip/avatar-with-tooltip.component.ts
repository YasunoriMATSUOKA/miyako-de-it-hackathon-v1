import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-avatar-with-tooltip',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  template: `
    <ng-container
      *ngIf="isValidName(); then withTooltip; else withoutTooltip"
    ></ng-container>

    <ng-template #withTooltip>
      <div class="tooltip tooltip-left" attr.data-tip="{{ name }}">
        <app-avatar [imageUrl]="imageUrl"></app-avatar>
      </div>
    </ng-template>

    <ng-template #withoutTooltip>
      <app-avatar [imageUrl]="imageUrl"></app-avatar>
    </ng-template>
  `,
  styles: [],
})
export class AvatarWithTooltipComponent {
  @Input() name = '';
  @Input() imageUrl = '';

  isValidName = () => Boolean(this.name);
}
