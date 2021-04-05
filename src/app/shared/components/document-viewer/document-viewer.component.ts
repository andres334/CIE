import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxReportViewerModule } from 'devexpress-reporting-angular';

@Component({
  selector: 'app-document-viewer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './document-viewer.component.html',
  styleUrls: [
    "../../../../../node_modules/jquery-ui/themes/base/all.css",
    "../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css",
    "../../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css"
]
})
export class DocumentViewerComponent {
  @Input()
  pdfname: string;

  public service = 'https://cie.electroao.com/WSAO/API/PdfViewer';
  public document = '1000119378_0_1000119378_9.pdf';

  title = 'Reporte';
  reportUrl: string = 'Products';
  hostUrl: string = 'https://cie.electroao.com/WSAO/API';
  invokeAction: string = '/WebDocumentViewer/Invoke';
  constructor(private router: Router) {}
}

@NgModule({
  imports: [CommonModule, RouterModule, DxReportViewerModule],
  declarations: [DocumentViewerComponent],
  exports: [DocumentViewerComponent],
})
export class DocumentViewerModule {}
