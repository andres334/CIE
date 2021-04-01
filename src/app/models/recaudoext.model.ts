export class RecaudoExt {
  constructor(
    public Empresa: string,
    public CodigoEntidad: number,
    public Contrato: number,
    public Referencia: number,
    public Direccion: string,
    public CodigoCaja: string,
    public FechaVencimiento: Date,
    public ValorTotal: number
  ) {}
}
