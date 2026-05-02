import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,MatCardModule,NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = [
    {
      title: '📘 Simple Learning',
      desc: 'Complex election concepts explained easily'
    },
    {
      title: '⚡ Instant Answers',
      desc: 'Ask anything and get answers instantly'
    },
    {
      title: '🧠 Smart Modes',
      desc: 'Simple, Detailed, and Step-by-step responses'
    }
  ];

  constructor(private router: Router) {}

  goToChat() {
    this.router.navigate(['/chat']);
  }
}
