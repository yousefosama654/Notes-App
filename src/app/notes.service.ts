import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _http: HttpClient) {}
  addnote(data: any): Observable<any> {
    return this._http.post('https://routeegypt.herokuapp.com/addNote', data);
  }
  getnote(data: any): Observable<any> {
    return this._http.post(
      'https://routeegypt.herokuapp.com/getUserNotes',
      data
    );
  }
  updatenote(data: any): Observable<any> {
    return this._http.put('https://routeegypt.herokuapp.com/updateNote', data);
  }
  deletenote(data: any): Observable<any> {
    let options = {
      Headers: new HttpHeaders({}),
      body: {
        NoteID: data.NoteID,
        token: localStorage.getItem('token'),
      },
    };
    return this._http.delete(
      'https://routeegypt.herokuapp.com/deleteNote',
      options
    );
  }
}
