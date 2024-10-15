import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Note {
  _id?: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly apiUrl = 'https://notes-app-backend-production-49eb.up.railway.app/notes';
   token : any = localStorage.getItem('token'); // Get the token from local storage
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
      'x-auth-token': this.token // Set the token in headers
    });
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl, { headers: this.headers });
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note, { headers: this.headers });
  }

  editNote(id: string, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note, { headers: this.headers });
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
