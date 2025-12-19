import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { collection, doc, setDoc, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Import your exported Auth instance
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Data, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { onAuthStateChanged } from 'firebase/auth';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../data-service';


interface Note {
  id: string; // The Firestore Document ID
  title: string;
  content: string;
  createdAt: Date;
}




@Component({
  selector: 'app-notes',
  imports: [FormsModule, RouterModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, DatePipe],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})

export class Notes implements OnInit, OnDestroy {
  noteTitle: string = '';
  noteContent: string = '';
  // Array to hold the retrieved notes
  notes: Note[] = [];
  userStatus: Boolean = false;
  isEditing: Boolean = false
  editId: string | null = ""




  // // Variable to store the unsubscribe function from onSnapshot
  private unsubscribeNotes: (() => void) | undefined;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef,
    private data: DataService
  ) { }

  ngOnInit() {
    // Start listening for notes when the component loads


    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User verified:", user.uid);
        this.fetchNotes()
        this.userStatus = true;
      } else {
        console.log("No user is signed in.");
        this.userStatus = false;
      }
    })

  }



  ngOnDestroy(): void {
    // Clean up the listener when the component is destroyed
    if (this.unsubscribeNotes) {
      this.unsubscribeNotes();
      console.log("Notes listener unsubscribed.");
    }
  }


  async saveNote() {
    const user = auth.currentUser; // Get the currently signed-in user

    if (user) {
      const uid = user.uid;
      const noteId = doc(collection(db, 'dummy')).id; // Generates a unique ID for the note

      // Structure the path: users/USER_UID/notes/NOTE_ID
      const noteDocRef = doc(db, `users/${uid}/notes/${noteId}`);

      const noteData = {
        title: this.noteTitle,
        content: this.noteContent,
        createdAt: new Date()
      };

      // Clear the input fields after saving
      this.noteTitle = '';
      this.noteContent = '';

      try {
        if (this.isEditing && this.editId) {
          // 🔄 UPDATE
          const ref = doc(db, `users/${uid}/notes/${this.editId}`);
          await updateDoc(ref, noteData);
          console.log('Note updated');
        } else {
          const noteId = doc(collection(db, 'dummy')).id;
          const ref = doc(db, `users/${uid}/notes/${noteId}`);
          await setDoc(ref, noteData);
          console.log('Note created');
        }

        // reset state
        this.zone.run(() => {
          this.noteTitle = '';
          this.noteContent = '';
          this.isEditing = false;
          this.editId = null;
        });

        const element = document.getElementById('saved-notes-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }


      } catch (error) {
        console.error("Error saving note:", error);
      }
    } else {
      console.error("No user is currently signed in.");
    }
  }






  fetchNotes() {
    const user = auth.currentUser;
    // if user is not logged in
    if (!user) {
      return;
    }


    const notesCollectionRef = collection(db, `users/${user.uid}/notes`); // all logged in user notes

    // Create a query: Order notes by 'createdAt' descending (newest first)
    const notesQuery = query(notesCollectionRef, orderBy("createdAt", "desc"));

    // Set up the real-time listener (onSnapshot)
    this.unsubscribeNotes = onSnapshot(notesQuery, (snapshot: QuerySnapshot) => {

      const fetchedNotes: Note[] = [];

      snapshot.forEach((doc) => {
        // Cast the data to the Note interface, adding the document ID
        const data = doc.data();
        fetchedNotes.push({
          id: doc.id,
          title: data['title'],
          content: data['content'],
          // Assuming 'createdAt' is a Firebase Timestamp, you might need to convert it
          createdAt: data['createdAt'] ? data['createdAt'].toDate() : new Date()
        });
      });

      // Update the component's state array with the new data


      this.zone.run(() => {
        this.notes = [...fetchedNotes];
      })
      this.cdr.detectChanges();



      console.log("Notes updated in real-time:", this.notes.length);
    }, (error) => {
      console.error("Error fetching notes:", error);
    });
  }

  async deleteNotes(noteId: string) {
    const user = auth.currentUser;

    // if user is not logged in
    if (!user) {
      console.log("Cannot fetch notes: No user signed in.");
      return;
    }

    if (user) {
      this.userStatus = true;
    }
    var userPrompt = confirm("Are you sure you want to delete note?")
    if (userPrompt) {
      const notesDocRef = doc(db, `users/${user.uid}/notes/${noteId}`);

      await deleteDoc(notesDocRef)
      this.zone.run(() => {
        console.log("user deleted note");
        this.cdr.detectChanges()
      });


    } else {
      console.log("operation cancelled by user");

    }
  }

  async editNote(id: string, note: Note) {
    this.isEditing = true
    this.editId = id;


    // Use the ID from your HTML section
    const element = document.getElementById('create-note-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.noteTitle = note.title
    this.noteContent = note.content





  }

}
