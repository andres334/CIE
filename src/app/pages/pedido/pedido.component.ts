import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DetallePedido } from 'src/app/models';
import { AuthService, PedidoService } from '../../shared/services';

@Component({
  templateUrl: './pedido.component.html',
  styleUrls: []
})
export class PedidoComponent implements OnInit {
  formData = {
    Tipo: '',
    Sucursal: '',
    Estado: 0,
    Documento: '',
    Consecutivo: 0,
    Vendedor: '',
    Fecha: new Date().getTime(),
    Cliente: '',
    Direccion: '',
    FechaEntrega: new Date().getTime(),
    Descripcion: '',
    Plazo: 0
  };

  //hola
  loading: boolean;
  tipoOptions: any;
  sucursalOptions: any;
  estadoOptions: any;
  documentos: any;
  documentoOptions: any;
  consecutivo = 0;
  vendedorOptions: any;
  direccionOptions: any;
  plazoOptions: any;
  startEditAction = 'click';
  dataSource: DetallePedido[];

  colores: any;
  productos: any;

  constructor(private pedidoService: PedidoService, private authService: AuthService) {
    this.loading = true;
    this.dataSource = [];
    this.pedidoService.getDocumentos().subscribe((data) => {
      if (data['data']) {
        let sucursales = [];
        data['data'].forEach((s) => {
          sucursales.push({
            codigoSucursal: s.codigoSucursal,
            nombreSucursal: s.nombreSucursal
          });
        });
        sucursales = sucursales.filter(
          (s, i, arr) => arr.findIndex(t => t.codigoSucursal === s.codigoSucursal) === i
        );
        let documentos = [];
        data['data'].forEach((s) => {
          documentos.push({
            codigoSucursal: s.codigoSucursal,
            Documento: s.Documento,
            Consecutivo: s.Consecutivo
          });
        });
        documentos = documentos.filter(
          (s, i, arr) => arr.findIndex(t => t.Documento === s.Documento) === i
        );
        this.documentos = this.filterBySucursal(documentos, sucursales[0].codigoSucursal);
        this.sucursalOptions = {
          value: sucursales === undefined ? '' : sucursales[0].codigoSucursal,
          items: sucursales,
          valueExpr: 'codigoSucursal',
          displayExpr: 'nombreSucursal',
          onValueChanged: (e) => {
            this.documentos = this.filterBySucursal(documentos, e.value);
          }
        };
        this.documentoOptions = {
          items: this.documentos,
          value: '',
          valueExpr: 'Documento',
          displayExpr: 'Documento',
          onValueChanged: (e) => {
            this.consecutivo = this.filterByDocumento(documentos, e.value)[0].Consecutivo;
          }
        };
      } else {
        notify(data['message'], 'error', 2000);
      }
      this.loading = false;
    });
    this.pedidoService.getProductos().subscribe(datap => {
      if (datap['data']) {
        this.productos = datap['data'];
      }
    });
    this.tipoOptions = {
      items: [{ CodigoTipo: 'NUEVO', NombreTipo: 'Nuevo' },
      { CodigoTipo: 'ACTIVOSF', NombreTipo: 'Activos Fijos' },
      { CodigoTipo: 'SEGUNDA', NombreTipo: 'Sengunda' },
      { CodigoTipo: 'ESPECIAL', NombreTipo: 'Especial' }],
      value: 'NUEVO',
      valueExpr: 'CodigoTipo',
      displayExpr: 'NombreTipo'
    };
    this.loading = false;
  }

  ngOnInit(): void {
  }

  filterBySucursal(data, s) {
    return data.filter(e => e.codigoSucursal === s);
  }

  filterByDocumento(data, s) {
    return data.filter(e => e.Documento === s);
  }

  setProductoValue(rowData: any, value: any) {
    rowData.kit = false;
    rowData.color = null;
    rowData.cantidad = 1;
    rowData.descuento = 0;
    (this as any).defaultSetCellValue(rowData, value);
  }

  onEditorPreparing(e) {
    if (e.parentType === 'dataRow' && e.dataField !== 'producto') {
      e.editorOptions.disabled = (e.row.data.producto === undefined);
    }
    if (e.dataField === 'producto') {
      e.editorOptions.onValueChanged = (ev: any) => {
        e.setValue(ev.value);
        this.pedidoService.getDatos(ev.value).subscribe(data => {
          if (data['data']) {
            e.component.cellValue(e.row.rowIndex, 'valorUnitario', data['data'][0].ValorTotal);
            e.component.cellValue(e.row.rowIndex, 'valorIva', data['data'][0].ValorIva);
            e.component.cellValue(e.row.rowIndex, 'iva', data['data'][0].ValorIva > 0 ? '19%' : '0%');
            e.component.cellValue(e.row.rowIndex, 'descuento', data['data'][0].ValorDescuento);
            e.component.cellValue(e.row.rowIndex, 'otros', 0);
          }
        });
      };
    }
  }

  valorTotal_calculado(rowData) {
    return (rowData.cantidad * rowData.valorUnitario) - rowData.descuento;
  }
}
