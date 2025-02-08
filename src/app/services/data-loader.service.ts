import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Property, PropertyResponse, Category } from '../pages/properties/models';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private http = inject(HttpClient);
  private readonly dataUrl = '/data/property-listings.json';

  getCategories(): Observable<Category[]> {
    return this.http.get<PropertyResponse>(this.dataUrl).pipe(
      map(response => response.categories)
    );
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<PropertyResponse>(this.dataUrl).pipe(
      map(response => response.categories.flatMap(category => category.properties))
    );
  }

  getFeaturedProperties(limit: number = 4): Observable<Property[]> {
    return this.getAllProperties().pipe(
      map(properties => properties.slice(0, limit))
    );
  }

  getPropertyById(propertyId: string): Observable<Property | undefined> {
    return this.getAllProperties().pipe(
      map(properties => properties.find(property => property.propertyId === propertyId))
    );
  }

  getPropertiesByCategory(categoryId: string): Observable<Property[]> {
    return this.getCategories().pipe(
      map(categories =>
        categories.find(category => category.id === categoryId)?.properties || []
      )
    );
  }
}
