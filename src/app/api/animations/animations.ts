import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

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
    transition('void => *', []),
    transition('* => void', []),
    transition('* => *', [
      animate(1200, keyframes([
        style({background: '#FFD900', color: '#FF5500', offset: 0.0}),
        style({background: 'inherit', color: 'inherit', offset: 1.0}),
      ])),
    ]),
  ]);

export const textWrap = trigger(
  'textWrap', [
    state('collapsed', style({'white-space': 'nowrap', 'text-overflow': 'ellipsis', overflow: 'hidden', height: '29px'})),

    state('expanded', style({height: 'auto', 'white-space': 'pre-wrap', 'text-overflow': 'unset', overflow: 'hidden'})),
    transition('expanded <=> collapsed', animate('.4s cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ],
);

export const fadeIn = trigger('fadeIn', [
    state('void', style({opacity: 0, transform: 'scale(.5)'})),
  transition('void <=> *', [
    animate('{{time}}ms')
  ], {params: { time: 100}})
  ]);

export const questionCardAnimation = trigger('questionCardAnimation', [
  transition(':enter', [
    query('.explore-question', [
      style({opacity: 0, transform: 'scale(.5)'}),
      stagger( 100, [
        animate('400ms'), style({opacity: 1, transform: 'none'})
      ])
    ], {optional: true})
  ])
])
