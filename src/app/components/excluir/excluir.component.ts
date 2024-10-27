import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
})
export class ExcluirComponent implements OnInit {
  inputData: any;
  funcionario!: Funcionario;

  constructor(
    private FuncionarioService: FuncionarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ExcluirComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.FuncionarioService.GetFuncionario(this.inputData.id).subscribe(data => {
      this.funcionario = data.dados;

      console.log(this.funcionario)
    })
  }

  Excluir(){
    this.FuncionarioService.ExcluirFuncionario(this.inputData.id).subscribe((data) =>{
      this.ref.close();
      window.location.reload();
    })
  }

  Cancelar(){
    this.ref.close();
  }
}
