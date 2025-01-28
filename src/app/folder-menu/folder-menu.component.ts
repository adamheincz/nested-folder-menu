import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Folder } from './folder.model';
import { FolderService } from '../folder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folder-menu.component.html',
  styleUrl: './folder-menu.component.css'
})
export class FolderMenuComponent implements OnInit {
  folders$: Observable<Folder[]> | undefined;

  currentMainFolder$: Observable<Folder>;
  inspectedFolder$: Observable<Folder>;
  folderStack$: Observable<Folder[]>;


  constructor(private folderService: FolderService) {
    this.currentMainFolder$ = this.folderService.getCurrentMainFolder();
    this.inspectedFolder$ = this.folderService.getInspectedFolder();
    this.folderStack$ = this.folderService.getFolderStack();
  }

  ngOnInit(): void {
    this.folders$ = this.folderService.getFolders();
  }

  onOpenFolder(folder: Folder) {
    this.folderService.openFolder(folder);
  }

  onOpenMainFolder(folder: Folder) {
    this.folderService.openMainFolder(folder)
  }
  
  onBack() {
    this.folderService.goBack();
  }

}
