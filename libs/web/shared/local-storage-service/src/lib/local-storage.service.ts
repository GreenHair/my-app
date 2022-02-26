import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage

  constructor() {
    this.localStorage = window.localStorage
  }

  set(key: string, value: string) {
    this.localStorage.setItem(key, value)
  }

  get<T>(key: string): T | null {
    const value = this.localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
}
