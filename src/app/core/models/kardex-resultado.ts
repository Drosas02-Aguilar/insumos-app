export interface KardexResultado {
  fecha: string;
  claveContrato: string;
  usuario: string;
  nodoRecepcion: string;
  descNodoRecepcion: string;
  nodoEntrega: string;
  descNodoEntrega: string;
  zonaInyeccion: string;
  zonaExtraccion: string;
  qtyNomRecepcion: number;
  qtyAsigRecepcion: number;
  qtyNomEntrega: number;
  qtyAsigEntrega: number;
  gasExceso: number;
  tarifaExcesoFirme: number;
  tarifaUsoInterrumpible: number;
  cargoUso: number;
  cargoGasExceso: number;
  totalFacturar: number;
}
