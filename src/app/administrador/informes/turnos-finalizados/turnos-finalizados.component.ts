import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-finalizados',
  templateUrl: './turnos-finalizados.component.html',
  styleUrls: ['./turnos-finalizados.component.scss']
})
export class TurnosFinalizadosComponent implements OnInit {
  start = new Date('2022-01-01');
  end = new Date('2022-12-12');

  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.turnoService.getRef()
      .where('fecha', '>', this.start)
      .where('fecha', '<', this.end)
      .onSnapshot(
        qs => qs.forEach(
          qds => {
            console.log(qds.data());
          }
        )
      );
  }

}
