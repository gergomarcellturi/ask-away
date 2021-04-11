import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild('scrollElement') public scrollElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public goTo = (url: string): void => {
    window.open(url, '_blank');
  }

}
