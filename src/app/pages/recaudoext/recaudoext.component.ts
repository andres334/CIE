import { Component, OnInit, Output } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Usuario, RecaudoExt } from 'src/app/models';
import { RecaudoextService, AuthService } from '../../shared/services';
import { BarcodeFormat } from '@zxing/library';

@Component({
  templateUrl: './recaudoext.component.html',
})

export class RecaudoextComponent implements OnInit {
  user: Usuario;
  loading: boolean;
  recaudoext: RecaudoExt = new RecaudoExt('', 0, 0, 0, '', '', new Date(), 0);
  entidadOptions: any;
  cajaOptions: any;
  popupVisible: boolean;
  popupPagoVisible: boolean;
  popupCameraVisible: boolean;
  popupRecaudoVisible: boolean;
  btnPago: boolean;
  btnRecaudo: boolean;
  codigoBarras = '';

  @Output()
  idRecaudo: string;
  // '318818'

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_93,
    BarcodeFormat.MAXICODE,
    BarcodeFormat.QR_CODE,
  ];

  availableDevices: MediaDeviceInfo[];
  hasDevices: boolean;
  hasPermission: boolean;
  deviceSelected: string;

  constructor(
    private recaudoextService: RecaudoextService,
    private authService: AuthService
  ) {
    // this.idRecaudo = '-12629196_-1_-12629196_1.pdf';
    this.btnPago = false;
    this.btnRecaudo = true;
    this.popupVisible = true;
    this.popupPagoVisible = false;
    this.popupCameraVisible = false;
    this.popupRecaudoVisible = false;
    this.authService.getUser().subscribe((data) => {
      if (data['data']) {
        this.user = data['data'];
        this.cajaOptions = {
          value: data['data'].caja[0] === undefined ? '' : data['data'].caja[0].codigoCaja,
          items: data['data'].caja,
          valueExpr: 'codigoCaja',
          displayExpr: 'nombreCaja',
        };
      } else {
        notify(data['message'], 'error', 2000);
      }
    });
    this.recaudoextService.getDatosEntidad().subscribe((data) => {
      if (data['data']) {
        this.entidadOptions = {
          value: data['data'][0].codigoEntidad,
          items: data['data'],
          valueExpr: 'codigoEntidad',
          displayExpr: 'nombreEntidad',
        };
      }
    });
  }

  ngOnInit(): void {}

  getLoadingTemplate(texto: string) {
    return (
      '<div *dxTemplate=\'let data of \'content\'\'>' +
      '<span class=\'dx-button-text\'>' +
      '<ng-container *ngIf=\'loading; else notLoading\'>' +
      '<dx-load-indicator' +
      'width=\'24px\'' +
      'height=\'24px\'' +
      '[visible]=\'true\'>' +
      '</dx-load-indicator>' +
      '</ng-container>' +
      '<ng-template #notLoading>' +
      texto +
      '</ng-template>' +
      '</span>' +
      '</div>'
    );
  }

  buscaFacturas = () => {
    this.loading = true;
    this.recaudoextService.getFactura(this.codigoBarras).subscribe((data) => {
      if (data['result'] === 1) {
        if (data['data'].recaudo) {
          const tm = data['data'].recaudo.total_transaccion.length;
          data['data'].recaudo.total_transaccion = data[
            'data'
          ].recaudo.total_transaccion.substring(0, tm - 2);
          this.recaudoext.Empresa = 'AO';
          this.recaudoext.Contrato = data['data'].recaudo.referencia2;
          this.recaudoext.Referencia = data['data'].recaudo.referencia1;
          this.recaudoext.FechaVencimiento = data['data'].recaudo.fecha_vcmto;
          this.recaudoext.Direccion = data['data'].recaudo.detalle;
          this.recaudoext.ValorTotal = data['data'].recaudo.total_transaccion;
          this.popupVisible = false;
          this.btnPago = true;
          this.loading = false;
        } else {
          this.popupVisible = true;
          this.btnPago = false;
          notify(data['data'].error_descripcion, 'warning', 2000);
          this.loading = false;
        }
      } else {
        this.btnPago = false;
        notify(data['message'], 'error', 2000);
        this.loading = false;
      }
      this.codigoBarras = '';
    });
  }

  guardarRecaudo = () => {
    this.loading = true;
    this.recaudoextService.postRecaudo(this.recaudoext).subscribe((data) => {
      if (data['result'] === 1) {
        console.log(data);
        this.popupPagoVisible = false;
        this.btnPago = false;
        this.btnRecaudo = true;
        this.idRecaudo = data['data'];
        notify('Guardado Correctamente', 'success', 2000);
        this.loading = false;
      } else {
        this.btnPago = false;
        notify(data['message'], 'error', 2000);
        this.loading = false;
      }
    });
  }

  confirmarRecaudo = () => {
    this.popupVisible = false;
    this.popupPagoVisible = true;
  }

  abrirCamara = () => {
    this.popupCameraVisible = true;
    if (this.hasDevices) {
      this.deviceSelected = this.availableDevices[0].deviceId;
    }
  }

  cancelarCamara() {
    this.popupCameraVisible = false;
  }

  cancelarRecaudo = () => {
    this.popupPagoVisible = false;
    this.btnPago = false;
  }

  volverEscanear = () => {
    this.popupPagoVisible = false;
    this.btnPago = false;
    this.popupVisible = true;
  }

  cancelarEscaner = () => {
    this.popupPagoVisible = false;
    this.popupVisible = false;
    this.btnPago = false;
    this.loading = true;
  }

  onCodeResult(resultString: string) {
    this.deviceSelected = '';
    this.popupCameraVisible = false;
    this.codigoBarras = resultString;
    notify('Codigo Escaneado', 'success', 2000);
    setTimeout(() => {
      this.buscaFacturas();
    }, 1000);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    this.deviceSelected = this.availableDevices[0].deviceId;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  mostrarRecaudo(){
    this.popupRecaudoVisible = true;
  }
}
