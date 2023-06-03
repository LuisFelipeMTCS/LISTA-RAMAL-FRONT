import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ListarComponent} from "./pages/ramal/listar/listar.component";
import {IncluirComponent} from "./pages/ramal/incluir/incluir.component";
import {ramalRoutes} from "./pages/ramal/ramal-routing.module";

const routes: Routes = [
  { path: "", component: HomeComponent, children: [... ramalRoutes]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
