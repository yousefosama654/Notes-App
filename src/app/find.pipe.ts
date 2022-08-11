import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {
  transform(notesarr:any[],term:string): Array<any> { 
 return notesarr.filter((note)=> note.title.toLowerCase().includes(term.toLowerCase()) || note.desc.toLowerCase().includes(term.toLowerCase()) );
  }

}
