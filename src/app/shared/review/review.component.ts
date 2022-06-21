import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() turno: any;
  @Input() rol: any;
  @Output() volver = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
