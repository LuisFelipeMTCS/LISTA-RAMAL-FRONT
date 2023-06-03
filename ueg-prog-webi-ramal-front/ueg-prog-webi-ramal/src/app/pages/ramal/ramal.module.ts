import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListarComponent} from "./listar/listar.component";
import {IncluirComponent} from "./incluir/incluir.component";
import {RouterModule} from "@angular/router";
import {ramalRoutes} from "./ramal-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListarComponent,
    IncluirComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ramalRoutes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class RamalModule { }
