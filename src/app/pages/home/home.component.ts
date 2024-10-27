import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/components/excluir/excluir.component';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //var pra colocar os funcionarios que vem da minha funcao GetFuncionarios()
  funcionarios: Funcionario[] = [];

  //var pra fazer a barra de pesquisa dos funcionarios na pagina
  funcionariosGeral: Funcionario[] = [];

  //por colunas na tabela
  columnsToDisplay = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Ações', 'Teste'];

  //injecao de dependencia pra pegar as funcoes da funcionarioService
  constructor(private funcionarioService: FuncionarioService, public dialog: MatDialog) {}

  //tudo que tiver dentro dessa funçao será executado primeiro
  ngOnInit(): void {
    this.funcionarioService.GetFuncionarios().subscribe((data) => {
      const dados = data.dados;

      //formatar datas que vem da api
      dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString(
          'pt-BR'
        );
        item.dataDeAlteracao = new Date(
          item.dataDeAlteracao!
        ).toLocaleDateString('pt-BR');

        console.log(dados);
      });

      //colocar dados dentro das minhas variaveis la em cima
      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.funcionarios = this.funcionariosGeral.filter((funcionario) => {
      return funcionario.nome.toLocaleLowerCase().includes(value);
    });

  }


  openDialog(id : number){
    this.dialog.open(ExcluirComponent,{
      width: '450px',
      height: '450px',
      data: {
        id: id
       }
    })
  }

}
