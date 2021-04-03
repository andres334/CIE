import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  PdfViewerModule,
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  AnnotationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
} from '@syncfusion/ej2-angular-pdfviewer';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    AnnotationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
  ],
  styleUrls: [],
})
export class DocumentViewerComponent {
  @Input()
  pdfname: string;

  public service = 'https://cie.electroao.com/WSAO/API/PdfViewer';
  public document = '1000119378_0_1000119378_9.pdf';
  constructor(private router: Router) {
  }
}

@NgModule({
  imports: [PdfViewerModule, CommonModule, RouterModule],
  declarations: [DocumentViewerComponent],
  exports: [DocumentViewerComponent],
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
  ],
})
export class DocumentViewerModule {}
