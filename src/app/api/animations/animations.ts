import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

const VOID = '* <=> void';
const EASE_OUT_400 = '400ms ease-out';

export const detailExpand = trigger('detailExpand', [
  state('collapsed', style({height: '0px', minHeight: '0'})),
  state('expanded', style({height: '*'})),
  transition('expanded <=> collapsed', animate('.4s cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const fade = trigger('fade', [

  state('void', style({opacity: 0, transform: 'scale(0.5)'})),

  transition(VOID, animate(EASE_OUT_400)),
]);

export const valueChanged = trigger(
  'valueChanged',
  [
    transition('void => *', []),   // when the item is created
    transition('* => void', []),   // when the item is removed
    transition('* => *', [         // when the item is changed
      animate(1200, keyframes([  // animate for 1200 ms
        style({background: '#FFD900', color: '#FF5500', offset: 0.0}),
        style({background: 'inherit', color: 'inherit', offset: 1.0}),
      ])),
    ]),
  ]);
