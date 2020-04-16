import { NgModule } from '@angular/core'
import { SharedModule } from '@app/shared.module'
import { RouterModule, Routes } from '@angular/router'

// Templet-Title
const routes: Routes = [
  { path: '', redirectTo: 'route', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TempletModule { }
