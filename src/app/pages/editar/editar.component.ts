import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  btnAcao: string = 'Editar'
  btnTitulo: string = 'Editar Funcionario'
  funcionario!: Funcionario;

  constructor(private funcionarioService : FuncionarioService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    console.log(1);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetFuncionario(id).subscribe((data)=>{
      this.funcionario = data.dados;
      console.log(2)
    })
  }

  editFuncionario(funcionario : Funcionario){
    this.funcionarioService.EditarFuncionario(funcionario).subscribe((data) => {
      this.router.navigate(['/'])
    })
  }

}


