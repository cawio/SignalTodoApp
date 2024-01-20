import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private internalIsLoading = signal<boolean>(false);
  public isLoading = this.internalIsLoading.asReadonly();

  constructor() { }

  public startLoading(): void {
    this.internalIsLoading.set(true);
  }

  public stopLoading(): void {
    this.internalIsLoading.set(false);
  }
}
