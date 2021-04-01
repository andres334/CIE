import {  Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';

import { ProductosService } from 'src/app/shared/services';

@Component({
  templateUrl: './productos.component.html'
})

export class ProductosComponent implements OnInit {
  formData = {
    SKU: "",
    Nombre: "",
    modelo: "",
    linea: "",
    grupo: "",
    subgrupo: "",
    marca: "",
    colores: [],
    tallas: []
};
  loading :boolean;
  lineasOptions : any;
  gruposOptions : any;
  subgruposOptions : any;
  marcasOptions : any;
  modeloOptions : any;
  chkcolorOptions : any;
  chktallaOptions : any;
  addColorBtnOptions : any;
  addTallaBtnOptions : any;
  colorOptions: any[] = [];
  tallaOptions: any[] = [];

  sku : string[] = [];
  lineas : [];
  grupos : [];
  subgrupos : [];
  acolores : string[];
  atallas : string[];
  isColorVisible : boolean;
  isTallaVisible : boolean;

  constructor(private productosService : ProductosService) {
    this.loading = true;
    this.isColorVisible = (this.formData.colores.length > 0);
    this.isTallaVisible = (this.formData.tallas.length > 0);
    this.productosService.getCategorias().subscribe( data => {
      if(data['data']){
        this.lineas = data['data'].lineas;
        this.acolores = data['data'].colores;
        this.atallas = data['data'].tallas;

        this.marcasOptions = {
          items: data['data'].marcas,
          value : '',
          valueExpr: 'codigoMarca',
          displayExpr: 'nombreMarca',
          showClearButton : true,
          onValueChanged: (e) => this.generarSKU(e.value, 0)
        };

        this.lineasOptions = {
          items: this.lineas,
            value : '',
            valueExpr: 'codigoLinea',
            displayExpr: 'nombreLinea',
            showClearButton : true,
            onValueChanged: (e) => {
              this.grupos = this.filterByLinea(data['data'].grupos, e.value);
              this.gruposOptions = {
                  items: this.grupos,
                  value : '',
                  valueExpr: 'codigoGrupo',
                  displayExpr: 'nombreGrupo',
                  showClearButton : true,
                  onValueChanged: (ev) => {
                    this.subgrupos = this.filterByGrupo(data['data'].subgrupos, ev.value);
                    this.subgruposOptions = {
                        items: this.subgrupos,
                        value : '',
                        valueExpr: 'codigoSubGrupo',
                        displayExpr: 'nombreSubGrupo',
                        showClearButton : true
                    };
                  }
              };
            }
        };

        this.chkcolorOptions = {
            text: "Colores",
            value: (this.formData.colores.length > 0),
            onValueChanged: (e) => this.isColorVisible = e.value
        };

        this.chktallaOptions = {
            text: "Tallas",
            value: (this.formData.tallas.length > 0),
            onValueChanged: (e) => this.isTallaVisible = e.value
        };

        this.modeloOptions = {
          showClearButton : 'true',
          valueChangeEvent: 'keyup',
          onValueChanged : (e) => this.generarSKU(e.value,1)
        };

        this.addColorBtnOptions = {
            icon: "add",
            text: "Agregar Color",
            onClick: () => {
                this.formData.colores.push("");
                this.colorOptions = this.getColorsOptions(this.formData.colores);
            }
        };

        this.addTallaBtnOptions = {
            icon: "add",
            text: "Agregar Talla",
            onClick: () => {
                this.formData.tallas.push("");
                this.tallaOptions = this.getTallasOptions(this.formData.tallas);
            }
        };

        this.colorOptions = this.getColorsOptions(this.formData.colores);
        this.tallaOptions = this.getTallasOptions(this.formData.tallas);

      }else{
        notify(data['message'], 'error', 2000);
      }

      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  getColorsOptions(array: any) {
    let options = [];
    for (let i = 0; i < array.length; i++){
      options.push(this.generateNewColorOptions(i));
    }
    return options;
  }

  getTallasOptions(array: any) {
    let options = [];
    for (let i = 0; i < array.length; i++){
      options.push(this.generateNewTallaOptions(i));
    }
    return options;
  }

  generateNewTallaOptions(index: number) {
        return {
          items: this.atallas,
          valueExpr: 'codigoTalla',
          displayExpr: 'nombreTalla',
          showClearButton : true,
          buttons: [{
                name: "trash",
                location: "after",
                options: {
                    stylingMode: "text",
                    icon: "trash",
                    onClick: () => {
                        this.formData.tallas.splice(index, 1);
                        this.tallaOptions = this.getTallasOptions(this.formData.tallas);
                    }
                }
            }],
        onValueChanged: (e) => this.generarSKU(e.value, 2)
        }
    }

  generateNewColorOptions(index: number) {
          return {
            items: this.acolores,
            valueExpr: 'codigoColor',
            displayExpr: 'nombreColor',
            showClearButton : true,
            buttons: [{
                  name: "trash",
                  location: "after",
                  options: {
                      stylingMode: "text",
                      icon: "trash",
                      onClick: () => {
                          this.formData.colores.splice(index, 1);
                          this.colorOptions = this.getColorsOptions(this.formData.colores);
                      }
                  }
              }],
            onValueChanged: (e) => this.generarSKU(e.value, 3)
          }
      }

  generarSKU(element : string, position : number){
    (element)?
      this.sku[position] = element.substring(0,3).toUpperCase()
    :
     this.sku[position] = ""
    this.formData.SKU = this.sku.join('-');
  }

  filterByLinea(data, s) {
    return data.filter(e => e.codigoLinea == s);
  }

  filterByGrupo(data, s) {
    return data.filter(e => e.codigoGrupo == s);
  }
}
