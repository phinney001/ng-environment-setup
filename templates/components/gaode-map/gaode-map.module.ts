import { NgModule } from '@angular/core';
import { GaodeMapComponent } from './gaode-map.component';
import { LoaderConfig } from './gaode-map.service';


@NgModule({
  declarations: [
    GaodeMapComponent
  ],
  exports: [
    GaodeMapComponent
  ]
})
export class GaodeMapModule {
  static forRoot(config) {
    return {
      ngModule: GaodeMapModule,
      providers: [
        { provide: LoaderConfig, useValue: config }
      ]
    };
  }
}
