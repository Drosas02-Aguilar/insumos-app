import { Routes } from '@angular/router';

export const routes: Routes = [
{path:'', redirectTo: 'home',pathMatch: 'full'},
    {
path: 'home',
        loadComponent: ()=>
            import('./pages/home/home').then(m=>m.Home)

    },
    {
        path:'carga',
        loadComponent: () =>
            import('./pages/carga/carga').then(m=>m.Carga)
    },
    {
        path:'consultas',
        loadComponent: () =>
            import('./pages/consultas/consultas').then(m=>m.Consultas)
    },
    {path:'**', redirectTo: 'home'}


];
