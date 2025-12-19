import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data-service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface JokesFormat {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

@Component({
  selector: 'app-jokes',
  imports: [MatButtonModule, MatCard, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './jokes.html',
  styleUrl: './jokes.css',
})
export class Jokes {
  constructor(private data: DataService, private cdr: ChangeDetectorRef) { }
  joke: JokesFormat | null = null
  fetchJoke() {
    this.data.getRandomJoke().subscribe(
      {
        next: (response: JokesFormat) => {

          this.joke = response;
          this.cdr.detectChanges()
        },
        error: (err) => console.error(err)
      }

    )
  }
}
