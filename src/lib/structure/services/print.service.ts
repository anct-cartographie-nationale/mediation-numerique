import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Structure } from '../../map/models/structure.model';

@Injectable()
export class PrintService {
  public isPrinting = false;
  public structure: Structure;
  public structures: Structure[];

  constructor(private router: Router) {}

  public printDocument(documentName: string, structure: Structure): void {
    this.isPrinting = true;
    this.structure = structure;
    this.router.navigate([
      '/',
      {
        outlets: {
          print: ['print', documentName]
        }
      }
    ]);
  }

  public printDocuments(documentName: string, structures: Structure[]): void {
    this.isPrinting = true;
    this.structures = structures;
    this.router.navigate([
      '/',
      {
        outlets: {
          print: ['print', documentName]
        }
      }
    ]);
  }

  public onDataReady(): void {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    }, 1500);
  }
}
