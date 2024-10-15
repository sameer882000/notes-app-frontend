import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';

interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };
  editNoteId: string | null = null; 
  editedNote = { title: '', content: '' };
  
  constructor(private noteService: NoteService, private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
      this.notes.sort((a, b) => {
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
      });
      console.log(this.notes);
    });
  }

  addNote() {
    if (this.newNote.title && this.newNote.content) {
      this.noteService.createNote(this.newNote).subscribe((note) => {
        this.notes.push(note);
        this.newNote = { title: '', content: '' };
      });
    }
  }

  startEdit(note: any) {
    this.editNoteId = note._id; // Set the note's ID for editing
    this.editedNote = { title: note.title, content: note.content }; // Pre-fill the form with the note's data
}

// Save the edited note
saveEdit() {
    if (this.editNoteId) {
        this.noteService.editNote(this.editNoteId, this.editedNote)
            .subscribe(updatedNote => {
                // Update the note in the array
                const index = this.notes.findIndex(note => note._id === this.editNoteId);
                this.notes[index] = updatedNote;

                this.cancelEdit(); // Reset the form after saving
            }, error => {
                console.error('Error updating note', error);
            });
    }
}
  
cancelEdit() {
    this.editNoteId = null; // Reset the edit mode
    this.editedNote = { title: '', content: '' }; // Clear the edited note data
}

resetForm() {
    this.editNoteId = null; // Clear the editing ID
    this.newNote = { title: '', content: '' }; // Reset the new note form
}

  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note._id !== id);
    });
  }

   logout() {
    this.authService.logout(); // Call your logout method in AuthService
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
