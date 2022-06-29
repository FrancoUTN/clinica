import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);
import { FormsModule } from '@angular/forms';

import { InformesComponent } from './informes.component';
import { TurnosDiaComponent } from './turnos-dia/turnos-dia.component';
import { TestComponent } from './test/test.component';
import { TurnosSolicitadosComponent } from './turnos-solicitados/turnos-solicitados.component';
import { TurnosFinalizadosComponent } from './turnos-finalizados/turnos-finalizados.component';
import { TurnosEspecialidadComponent } from './turnos-especialidad/turnos-especialidad.component';
import { LogIngresosComponent } from './log-ingresos/log-ingresos.component';


const routes: Routes = [
  { path: '', component: InformesComponent, children: [
    { path: 'test', component: TestComponent },
    { path: 'turnos-dia', component: TurnosDiaComponent },
    { path: 'turnos-solicitados', component: TurnosSolicitadosComponent },
    { path: 'turnos-finalizados', component: TurnosFinalizadosComponent },
    { path: 'turnos-especialidad', component: TurnosEspecialidadComponent },
    { path: 'log-ingresos', component: LogIngresosComponent },
  ]}
];

@NgModule({
  declarations: [
    TurnosDiaComponent,
    TestComponent,
    TurnosSolicitadosComponent,
    TurnosFinalizadosComponent,
    TurnosEspecialidadComponent,
    LogIngresosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HighchartsChartModule
  ]
})
export class InformesModule { }
