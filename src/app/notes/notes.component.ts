import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';

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

  constructor(private noteService: NoteService) {}

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

  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note._id !== id);
    });
  }
}
