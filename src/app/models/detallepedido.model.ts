export class DetallePedido {

    constructor(
      public ID: number,
      public producto: string,
      public kit: string,
      public color: string,
      public cantidad: number,
      public valorUnitario: number,
      public descuento: number,
      public iva: string,
      public valorIva: number,
      public otros: number,
      public valorTotal: number){}
  }
