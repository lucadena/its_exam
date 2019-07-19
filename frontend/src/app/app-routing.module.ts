import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SectionComponent} from "./section/section.component";
import {HomeComponent} from "./home/home.component";
import {ConveyorComponent} from "./conveyor/conveyor.component";

const routes: Routes =  [
  {
    path: 'home',
    component: HomeComponent
  },
  {path: 'section/:id', component: SectionComponent},
  {path: 'conveyor/:id/:sectionId', component: ConveyorComponent},
  {path: 'conveyor/:id', component: ConveyorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
