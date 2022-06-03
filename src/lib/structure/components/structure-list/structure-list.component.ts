import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonType } from '@gouvfr-anct/mediation-numerique/shared';
import { GeoJson } from '../../../map/models/geojson.model';
import { Structure } from '../../../map/models/structure.model';
import { StructureRepository, STRUCTURE_TOKEN } from '../../repositories/structure.repository';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnChanges {
  @Input() public structureList: Structure[];
  @Input() public location: GeoJson;
  @Input() public selectedStructure: Structure = new Structure();
  @Output() public displayMapMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectedMarkerId: EventEmitter<string> = new EventEmitter<string>();

  public buttonTypeEnum = ButtonType;
  public showStructureDetails = false;
  public structure: Structure;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(STRUCTURE_TOKEN) readonly structureService: StructureRepository
  ) {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.id) {
        if (!this.structure) {
          this.structureService.getStructure(queryParams.id).subscribe((s) => {
            this.showDetails(new Structure(s));
          });
        }
      } else {
        this.closeDetails();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStructure && this.selectedStructure) {
      this.showDetails(this.selectedStructure);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          id: this.selectedStructure._id,
        },
      });
    }
    if (changes.structureList) {
      document.getElementById('listCard').scrollTo(0, 0);
    }
  }

  public showDetails(event: Structure): void {
    this.structure = event;
    this.selectedMarkerId.emit(this.structure._id);
  }

  public closeDetails(): void {
    this.selectedMarkerId.emit();
  }

  public handleCardHover(structure: Structure): void {
    this.displayMapMarkerId.emit(structure._id);
  }

  public mouseLeave(): void {
    this.displayMapMarkerId.emit(undefined);
  }
}
