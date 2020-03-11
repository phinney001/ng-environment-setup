import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      { scrollPositionRestoration: 'top' }
    )
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
