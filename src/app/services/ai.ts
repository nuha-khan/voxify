import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Ai {

  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string, mode: string) {
  return this.http.post('http://localhost:3000/api/chat', {
    prompt: prompt,
    mode: mode
  });
}
}