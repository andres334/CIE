export class Usuario {
  constructor(
    public avatarUrl: string,
    public codigoUsuario: string,
    public identificacion: string,
    public nombreUsuario: string,
    public cargoUsuario: string,
    public email: string,
    public caja: [],
    public birthDate: Date
  ) {}
}
