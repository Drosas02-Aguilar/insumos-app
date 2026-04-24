import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceResult } from '../models/service-result';
import { KardexResultado } from '../models/kardex-resultado';
import { NodoComercial } from '../models/nodo-comercial';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KardexService {
  private url = `${environment.apiUrl}/api/kardex`;

  constructor(private http: HttpClient) {}

  getContratoPorUsuario(usuario: string): Observable<ServiceResult<string>> {
    const params = new HttpParams().set('usuario', usuario);
    return this.http.get<ServiceResult<string>>(`${this.url}/contratos`, { params });
  }

  getUsuarioPorContrato(contrato: string): Observable<ServiceResult<string>> {
    const params = new HttpParams().set('contrato', contrato);
    return this.http.get<ServiceResult<string>>(`${this.url}/usuario`, { params });
  }

  getInfoPorNodoRecepcion(clave: string): Observable<ServiceResult<KardexResultado>> {
    const params = new HttpParams().set('clave', clave);
    return this.http.get<ServiceResult<KardexResultado>>(`${this.url}/nodo-recepcion`, { params });
  }

  getInfoPorNodosEntrega(c1:string,c2:string,c3:string): Observable<ServiceResult<KardexResultado>>{
    const params = new HttpParams().set('c1', c1).set('c2', c2).set('c3',c3);
    return this.http.get<ServiceResult<KardexResultado>>(`${this.url}/nodos-entrega`,{params});
  }

  getNodosRecepcion(): Observable<ServiceResult<NodoComercial>>{
    return this.http.get<ServiceResult<NodoComercial>>(`${this.url}/nodos/recepcion`);

  }

  getNodosEntrega(): Observable<ServiceResult<NodoComercial>>{
    return this.http.get<ServiceResult<NodoComercial>>(`${this.url}/nodos/entrega`)
  }

  getInfoPOrZonaInyeccion(zona: string): Observable<ServiceResult<KardexResultado>>{
    const params = new HttpParams().set('zona',zona);
    return this.http.get<ServiceResult<KardexResultado>>(`${this.url}/zona-inyeccion`,{params});
  }

  getInfoPorZonasExtraccion(z1:string, z2:string, z3:string):Observable<ServiceResult<KardexResultado>>{
    const params = new HttpParams().set('z1',z1).set('z2',z2).set('z3',z3);
    return this.http.get<ServiceResult<KardexResultado>>(`${this.url}/zonas-extraccion`,{params});
  }

  getInforPorContratos(c1:string,c2:string,c3: string,c4:string):Observable<ServiceResult<KardexResultado>>{
    const params = new HttpParams().set('c1',c1).set('c2',c2).set('c3',c3).set('c4',c4);
    return this.http.get<ServiceResult<KardexResultado>>(`${this.url}/contratos-multiples`, {params});  
}

getTotalFacturar(usuario: string): Observable<ServiceResult<number>>{
    const params = new HttpParams().set('usuario', usuario).set('anio',2021).set('mes',1);
    return this.http.get<ServiceResult<number>>(`${this.url}/total-facturar`,{params});
}

getPromedioNombreRecepcion(usuario: string): Observable<ServiceResult<number>>{
    const params = new HttpParams().set('usuario',usuario).set('anio', 2021).set('mes',1);
    return this.http.get<ServiceResult<number>>(`${this.url}/promedio-nom-recepcion`,{params});
}


}
