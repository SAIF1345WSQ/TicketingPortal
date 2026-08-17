import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
messages: any[] = [];
userPrompt: string = '';
isLoading = false;
constructor(private http: HttpClient) {}
sendMessage() {

  if (!this.userPrompt.trim()) {
    return;
  }

  const prompt = this.userPrompt;

  this.messages.push({
    type: 'user',
    text: prompt
  });

  this.userPrompt = '';
  this.isLoading = true;

  this.http.get(`https://localhost:7284/api/Home/ask?request=${prompt}`,
    { responseType: 'text' }
  ).subscribe({
    next: (response) => {
      this.messages.push({
        type: 'ai',
        text: response
      });

      this.isLoading = false;
    },
    error: (err) => {

      this.messages.push({
        type: 'ai',
        text: 'Error while connecting to SAP AI service.'
      });

      this.isLoading = false;

      console.error(err);
    }
  });
}
}
