import { TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { NoteService } from '../services/note.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [ HttpClientTestingModule ],  // <-- Add this
      providers: [ NoteService ]
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
