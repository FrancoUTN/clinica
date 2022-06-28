import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

import { InformesComponent } from './informes.component';
import { TurnosDiaComponent } from './turnos-dia/turnos-dia.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', component: InformesComponent, children: [
    { path: 'turnos-dia', component: TurnosDiaComponent },
    { path: 'test', component: TestComponent }
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
