export interface KardexResultado {
  fecha: string;
  claveContrato: string;
  usuario: string;
  nodoRecepcion: string;
  descNodoRecpcion: string;
  nodoEntrega: string;
  descNodoEntrega: string;
  zonaInyeccion: string;
  zonaExtraccion: string;
  qtyNomRecepcion: number;
  qtyAsigRecepcion: number;
  qtyNombreEntrega: number;
  qtyAsigEntrega: number;
  gasExceso: number;
  tarifaExcesoFirme: number;
  tarifaUsoInterrumpible: number;
  cargoUso: number;
  cargoGasExceso: number;
  totalFacturar: number;
}
