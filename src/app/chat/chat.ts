import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Ai } from '../../services/ai';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass], 
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class Chat {

  userInput: string = '';
  messages: {
    text: string,
    type: 'user' | 'ai',
    loading?: boolean
  }[] = [];
  loading: boolean = false;

  selectedMode: 'simple' | 'detailed' | 'steps' = 'simple';

  // ✅ NEW: chat container reference
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private aiService: Ai, private cdr: ChangeDetectorRef, private router: Router) {}

  // ✅ NEW: smart scroll
  scrollToBottomIfNeeded() {
    try {
      const el = this.chatContainer.nativeElement;

      const threshold = 100;
      const position = el.scrollTop + el.clientHeight;
      const height = el.scrollHeight;

      const isNearBottom = height - position <= threshold;

      if (isNearBottom) {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 50);
      }
    } catch (err) {}
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const prompt = this.userInput;
    const mode = this.selectedMode;

    // ✅ user message
    this.messages = [
      ...this.messages,
      { text: prompt, type: 'user' }
    ];

    this.scrollToBottomIfNeeded(); // ✅ added

    this.userInput = '';

    // ✅ thinking bubble
    this.messages = [
      ...this.messages,
      { text: '...', type: 'ai', loading: true }
    ];

    this.scrollToBottomIfNeeded(); // ✅ added

    this.aiService.generateResponse(prompt, mode).subscribe({
      next: (res: any) => {
        console.log("API RESPONSE:", res);

        let reply = '';

        if (typeof res === 'string') {
          reply = res;
        } else if (res?.text) {
          reply = res.text;
        } else {
          reply = JSON.stringify(res);
        }

        // REMOVE thinking bubble
        this.messages = this.messages.filter(m => !m.loading);
        this.cdr.detectChanges();

        // ADD real response
        setTimeout(() => {
          this.messages = [
            ...this.messages,
            { text: reply, type: 'ai' }
          ];

          this.cdr.detectChanges();
          this.scrollToBottomIfNeeded(); // ✅ added
        }, 0);
      },

      error: (err) => {
        console.log("ERROR:", err);

        this.messages = this.messages.filter(m => !m.loading);
        this.cdr.detectChanges();

        setTimeout(() => {
          this.messages = [
            ...this.messages,
            { text: 'Error from API', type: 'ai' }
          ];

          this.cdr.detectChanges();
          this.scrollToBottomIfNeeded(); // ✅ added
        }, 0);
      }
    });
  }
  goHome() {
  this.router.navigate(['/']);
}
}
