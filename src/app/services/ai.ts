import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Ai {

  private apiUrl = 'https://voxify-backend-kgmo.onrender.com/api/chat';

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string, mode: string) {
  return this.http.post(this.apiUrl, {
    prompt: prompt,
    mode: mode
  });
}
}
