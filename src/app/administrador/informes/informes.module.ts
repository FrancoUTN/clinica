import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);

import { InformesComponent } from './informes.component';
import { TurnosDiaComponent } from './turnos-dia/turnos-dia.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', component: InformesComponent, children: [
    { path: 'test', component: TestComponent },
    { path: 'turnos-dia', component: TurnosDiaComponent }
  ]}
];

@NgModule({
  declarations: [
    TurnosDiaComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HighchartsChartModule
  ]
})
export class InformesModule { }
