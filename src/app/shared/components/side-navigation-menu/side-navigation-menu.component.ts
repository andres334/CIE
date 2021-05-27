import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { AuthService } from '../../services';

import * as events from 'devextreme/events';
import { Opciones } from 'src/app/models';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy , OnInit {
  loading = false;

  @ViewChild(DxTreeViewComponent, { static: true })
  menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items;
  private _menu: [Opciones];
  get items() {
    if (!this._items && this._menu !== undefined) {
          this._items = this._menu.map((item) => {
            if (item.path && !(/^\//.test(item.path))){
              item.path = `/${item.path}`;
            }
            return { ...item, expanded: false };
            });
    }
    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(private elementRef: ElementRef, private authService: AuthService) {  }

  ngOnInit(){
  }

  onItemClick(event) {
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e) => {
      this.openMenu.next(e);
    });

    this.loading = true;
    this.authService.getOpciones().subscribe(
      data => {
        if (data['data']){
            this._menu = data['data'];
            this.loading = false;
          }else{
            this.loading = false;
            notify(data['message'], 'error', 2000);
          }
        },
       error => {
         console.log(error);
         notify(error, 'error', 2000);
       }
    );

  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
