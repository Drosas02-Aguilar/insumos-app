import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KardexService } from '../../core/services/kardex.service';
import { KardexResultado } from '../../core/models/kardex-resultado';
import { NodoComercial } from '../../core/models/nodo-comercial';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas {
  constructor(private kardexService: KardexService,
              private cdr: ChangeDetectorRef
  ) {}

  consultaActiva: number = 0;

  cargando: boolean = false;
  error: string = '';

  paramUsuario: string = '';
  paramContrato: string = '';
  paramNodo: string = '';
  paramZona: string = '';
  paramC1: string = '';
  paramC2: string = '';
  paramC3: string = '';
  paramC4: string = '';

  resultadoContratos: string[] = [];
  resultadoUsuario: string = '';
  resultadoKardex: KardexResultado[] = [];
  resultadoNodos: NodoComercial[] = [];
  resultadoTotal: number = 0;
  resultadoPromedio: number = 0;


  consultas= [
{ num: 1,  titulo: 'Contratos por Usuario',         desc: 'Lista de contratos de un usuario' },
  { num: 2,  titulo: 'Usuario por Contrato',           desc: 'Usuario asociado a un contrato' },
  { num: 3,  titulo: 'Info por Nodo Recepción',        desc: 'Registros con nodo de recepción dado' },
  { num: 4,  titulo: 'Info por Nodos Entrega',         desc: 'Registros con nodos N103, N046, E168' },
  { num: 5,  titulo: 'Nodos Comerciales Recepción',    desc: 'Catálogo de nodos de recepción' },
  { num: 6,  titulo: 'Nodos Comerciales Entrega',      desc: 'Catálogo de nodos de entrega' },
  { num: 7,  titulo: 'Info por Zona Inyección',        desc: 'Usuarios en zona tarifaria de inyección' },
  { num: 8,  titulo: 'Info por Zonas Extracción',      desc: 'Usuarios en zonas 2, 5 y 6 de extracción' },
  { num: 9,  titulo: 'Info por Contratos Múltiples',   desc: 'Datos de 4 contratos específicos' },
  { num: 10, titulo: 'Total a Facturar',               desc: 'Suma enero 2021 — Energía Infra' },
  { num: 11, titulo: 'Promedio Nominada Recepción',    desc: 'Promedio enero 2021 — CFE' },

  ];

  seleccionarConsulta(num: number): void {
    this.consultaActiva = num;
    this.limpiarResultados();
  }

  limpiarResultados(): void {
    this.error = '';
    this.resultadoContratos = [];
    this.resultadoUsuario = '';
    this.resultadoKardex = [];
    this.resultadoNodos = [];
    this.resultadoTotal = 0;
    this.resultadoPromedio = 0;
  }

  buscarContratos(): void {
    if (!this.paramUsuario.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getContratoPorUsuario(this.paramUsuario).subscribe({
      next: (res) => {
        this.resultadoContratos = res.objects ?? [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  buscarUsuario(): void {
    if (!this.paramUsuario.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getUsuarioPorContrato(this.paramContrato).subscribe({
      next: (res) => {
        this.resultadoUsuario = res.object ?? '';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  buscarPorNodoRecepcion(): void {
    if (!this.paramNodo.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getInfoPorNodoRecepcion(this.paramNodo).subscribe({
      next: (res) => {
        this.resultadoKardex = res.objects ?? [];
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar.';
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

  buscarPorNodosEntrega(): void {
    if (!this.paramC1.trim() || !this.paramC2.trim() || !this.paramC3.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getInfoPorNodosEntrega(this.paramC1, this.paramC2, this.paramC3).subscribe({
      next: res => {
        this.resultadoKardex = res.objects ?? [];
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => { this.error = 'Error al consultar.'; this.cargando = false; 
                this.cdr.detectChanges();
      }
    });
  }

  cargarNodosRecepcion(): void {
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getNodosRecepcion().subscribe({
      next: (res) => {
        this.resultadoNodos = res.objects ?? [];
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar';
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

  cargarNodosEntrega(): void {
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getNodosEntrega().subscribe({
      next: (res) => {
        this.resultadoNodos = res.objects ?? [];
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar.';
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

  buscarPorZonaInyeccion(): void {
    if (!this.paramZona.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getInfoPOrZonaInyeccion(this.paramZona).subscribe({
      next: (res) => {
        this.resultadoKardex = res.objects ?? [];
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar';
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

  buscarPorZonasExtraccion(): void {
    if (!this.paramC1.trim() || !this.paramC2.trim() || !this.paramC3.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService
      .getInfoPorZonasExtraccion(this.paramC1, this.paramC2, this.paramC3)
      .subscribe({
        next: (res) => {
          this.resultadoKardex = res.objects ?? [];
          this.cargando = false;
                  this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Error al consultar.';
          this.cargando = false;
                  this.cdr.detectChanges();
        },
      });
  }

  buscarporContratos(): void {
    if (
      !this.paramC1.trim() ||
      !this.paramC2.trim() ||
      !this.paramC3.trim() ||
      !this.paramC4.trim()
    )
      return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService
      .getInforPorContratos(this.paramC1, this.paramC2, this.paramC3, this.paramC4)
      .subscribe({
        next: (res) => {
          this.resultadoKardex = res.objects ?? [];
          this.cargando = false;
                  this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Error al consultar';
          this.cargando = false;
                  this.cdr.detectChanges();
        },
      });
  }

  buscarTotalFacturar(): void {
    if (!this.paramUsuario.trim()) return;
    this.cargando = true;
    this.limpiarResultados();

    this.kardexService.getTotalFacturar(this.paramUsuario).subscribe({
      next: (res) => {
        this.resultadoTotal = res.object ?? 0;
        this.cargando = false;
                this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al consultar.';
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

  buscarPromedioNomRecpcion(): void {
    if (!this.paramUsuario.trim()) return;
    this.cargando = true;
    this.limpiarResultados();
    this.kardexService.getPromedioNombreRecepcion(this.paramUsuario).subscribe({
      next: (res) => {
        this.resultadoPromedio = res.object ?? 0;
        this.cargando = false;
                this.cdr.detectChanges();
      },
    });
  }

getTituloActivo(): string {
  return this.consultas.find(q => q.num === this.consultaActiva)?.titulo ?? '';
}

}
