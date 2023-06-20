import {Routes} from "@angular/router";
import {ListarComponent} from "./listar/listar.component";
import {IncluirComponent} from "./incluir/incluir.component";

export const ramalRoutes: Routes = [
  {
    path: "ramal",
    children: [
      {
        path: "",
        component: ListarComponent
      },
      {
        path: "cadastrar",
        component: IncluirComponent
      },
      {
        path: ":idRamal",
        component: IncluirComponent
      }
    ]
  }
];

