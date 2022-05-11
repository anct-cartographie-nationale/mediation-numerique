import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from '../../../map/models/structure.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public structure: Structure;
  @Input() public isSelected: boolean;
  @Input() public isOrientation: boolean;
  @Input() public isClaimed = true;
  @Output() public showDetails: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public addToList: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public hover: EventEmitter<Structure> = new EventEmitter<Structure>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * Display distance in m or km according to value
   */
  public formatDistance(): string {
    if (this.structure.distance > 1000) {
      return (this.structure.distance / 1000).toFixed(1).toString() + ' km';
    } else {
      return this.structure.distance + ' m';
    }
  }

  public cardClicked(): void {
    this.showDetails.emit(this.structure);
    if (!this.isOrientation) {
      const queryString = this.route.snapshot.queryParamMap.get('search');
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryString
          ? {
              id: this.structure._id,
              search: queryString
            }
          : {
              id: this.structure._id
            }
      });
    }
  }

  public cardHover(): void {
    this.hover.emit(this.structure);
  }

  public cardAddToList(): void {
    this.addToList.emit(this.structure);
  }
}
