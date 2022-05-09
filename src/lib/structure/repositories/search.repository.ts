import { InjectionToken } from '@angular/core';
import { Module } from '../models/module.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

export interface SearchRepository {
  getCategoriesAccompaniment(): Observable<Category[]>;

  getCategoriesOthers(): Observable<Category[]>;

  getCategoriesTraining(): Observable<Category[]>;

  getIndex(array: Module[], id: string, categ: string): number;
}

export const SEARCH_TOKEN: InjectionToken<SearchRepository> = new InjectionToken<SearchRepository>(
  'structure-list.search.repository'
);
