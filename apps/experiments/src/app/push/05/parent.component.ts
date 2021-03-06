import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, from, fromEvent, Observable, Subject } from 'rxjs';
import { concatMap, scan, startWith } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent05',
  template: `
    <h2>
      Push Pipe 05
      <small
        >one sync multi-shot observables bound by single push as input</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <app-push-child05 [value]="value1$ | push: strategy"></app-push-child05>
  `,
  changeDetection: environment.changeDetection
})
export class Parent05Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

  numArray = [0, 1, 3, 4, 5];
  value1$ = this.btnClick$.pipe(
    startWith(0),
    concatMap(a => from(this.numArray)),
    scan((a): any => ++a, 0)
  );

  baseEffects$ = this.value1$;
}
