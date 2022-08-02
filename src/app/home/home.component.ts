import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotesService } from '../notes.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  addform: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });
  editform: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });
  notesArr: Array<any> = [];
  noteID: any;
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  addNote() {
    let obj = {
      title: this.addform.value.title,
      desc: this.addform.value.desc,
      citizenID: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
    };
    this._NotesService.addnote(obj).subscribe((response) => {
      this.displayNote();
      // to display if you add another note
      (document.getElementById('cancel') as HTMLElement).click();
    });
  }
  displayNote() {
    let obj = {
      userID: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
    };
    this._NotesService.getnote(obj).subscribe((response) => {
      if (response.message == 'success') {
        this.notesArr = response.Notes;
      }
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
  edit(_id: any) {
    this.noteID = _id;
    $('.dropdown-menu').dropdown('hide');
    for (let note of this.notesArr) {
      if (note._id == _id) {
        this.editform.controls['title'].setValue(note.title);
        this.editform.controls['desc'].setValue(note.desc);
        // how to set value inside a form (very important)
      }
    }
  }
  updateNote() {
    let obj = {
      title: this.editform.value.title,
      desc: this.editform.value.desc,
      NoteID: this.noteID,
      token: localStorage.getItem('token'),
    };
    this._NotesService.updatenote(obj).subscribe((response) => {
      if (response.message == 'updated') {
        (document.getElementById('canceledit') as HTMLElement).click();
        this.displayNote();
      }
    });
  }
  delete(_id: any) {
    this.noteID = _id;
    $('.dropdown-menu').dropdown('hide');
  }
  deleteNote() {
    let obj = {
      NoteID: this.noteID,
      token: localStorage.getItem('token'),
    };
    this._NotesService.deletenote(obj).subscribe((response) => {
      if (response.message == 'deleted') {
        document.getElementById('canceldel')?.click();
        this.displayNote();
      }
    });
  }
  constructor(
    private _AuthService: AuthService,
    private _NotesService: NotesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.displayNote();
  }
  changecolor(eventinfo: any, id: number) {
    this.r = Math.random() * 255;
    this.g = Math.random() * 255;
    this.b = Math.random() * 255;
    (
      document.getElementById(`${id}`) as HTMLElement
    ).style.backgroundColor = `rgb(${this.r},${this.g},${this.b}) `;
  }
}
