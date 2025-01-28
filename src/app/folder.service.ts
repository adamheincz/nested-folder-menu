import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from './folder-menu/folder.model';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  folderStack = new BehaviorSubject<Folder[]>([]);

  currentMainFolder = new Subject<Folder>();
  inspectedFolder = new Subject<Folder>();

  constructor(private http: HttpClient,) { }

  getFolders() {
    const url: string = "../../assets/dummy-data.json";
    return this.http.get<Folder[]>(url).pipe(
      tap((folders) => {
        if (folders.length > 0) {
          this.currentMainFolder.next(folders[0]);
          this.inspectedFolder.next(folders[0]);
          this.folderStack.next([folders[0]])
        }
      })
    );
  }

  getFolderStack() {
    return this.folderStack.asObservable();
  }

  openFolder(folder: Folder) {
    let currentArray = this.folderStack.getValue();
    if (currentArray.includes(folder)) {
      currentArray = currentArray.slice(0, currentArray.indexOf(folder));
    }
    this.folderStack.next([...currentArray, folder]);
    this.inspectedFolder.next(folder);
  }

  openMainFolder(folder: Folder) {
    this.folderStack.next([folder]);
    this.inspectedFolder.next(folder);
  }

  goBack() {
    let newArray = this.folderStack.getValue();
    if (newArray.length > 1) {
      newArray.pop();
      this.folderStack.next(newArray);
      this.inspectedFolder.next(newArray[newArray.length - 1])
    }
  }

  getCurrentMainFolder() {
    return this.currentMainFolder.asObservable();
  }

  getInspectedFolder() {
    return this.inspectedFolder.asObservable();
  }

  setCurrentMainFolder(folder: Folder) {
    this.currentMainFolder.next(folder);
  }

  setInspectedFolder(folder: Folder) {
    this.inspectedFolder.next(folder);
  }
}
