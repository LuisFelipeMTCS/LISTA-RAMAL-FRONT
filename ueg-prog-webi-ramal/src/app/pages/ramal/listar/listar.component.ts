import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RamalDto} from "../../../api/models/ramal-dto";
import {RamalControllerService} from "../../../api/services/ramal-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{

  colunasMostrar = ['id', 'ramal', 'nomeResponsavelSetor', 'nomeSetor', 'emailDepartamento', 'acao'];

  ramalDataSource: MatTableDataSource<RamalDto> = new MatTableDataSource<RamalDto>([])

  constructor(public ramalService: RamalControllerService, public snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.ramalService.listAll().subscribe(data => {
      this.ramalDataSource.data = data;
    })
  }

  remover(ramalDto: RamalDto){
    console.log("Removido", ramalDto.id);
    this.ramalService.excluir({id: ramalDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exclusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Ramal não existe mais")
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )
  }

  downloadPdf(){
    this.ramalService.downloadPdf()
      .subscribe(resposta =>{
        console.log('arquivo ', resposta)
        let url = URL.createObjectURL(resposta);
        window.open(url)
    })
  }



  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
