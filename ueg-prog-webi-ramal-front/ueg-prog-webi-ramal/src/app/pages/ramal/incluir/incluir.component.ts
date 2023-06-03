import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RamalControllerService} from "../../../api/services/ramal-controller.service";
import {RamalDto} from "../../../api/models/ramal-dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent {
  formGroup!: FormGroup;

  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao : string = this.ACAO_INCLUIR;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    public ramalService: RamalControllerService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    const paramId = this.route.snapshot.paramMap.get('idRamal');
    if (paramId){
      const codigo = parseInt(paramId);
      this.ramalService.obterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id;
          this.formGroup.patchValue(retorno);
        }
      )
    }
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      emailDepartamento: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nomeResponsavelSetor: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nomeSetor: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      ramal: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      if (!this.id) {
        this.incluirRamal();
      } else {
        this.alterarRamal();
      }
    }

  }

  incluirRamal() {
    this.ramalService.incluir({body: this.formGroup.value})
      .subscribe( retorno =>{
          console.log("Retorno:",retorno);
            alert("Ramal: " + retorno.ramal + " incluido com sucesso!");
          this.router.navigate(['/ramal']);
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao " + this.acao + "!");
        }
      )
  }

  alterarRamal() {
    this.ramalService.alterar({id: this.id, body: this.formGroup.value})
      .subscribe( retorno =>{
          console.log("Retorno:",retorno);
            alert("Ramal: " + retorno.ramal + " alterado com sucesso!");
          this.router.navigate(['/ramal']);
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao " + this.acao + "!");
        }
      )
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

}
