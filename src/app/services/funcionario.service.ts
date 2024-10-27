import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  //trazendo minha url do arquivo environment e acrescentando a palavra funcionario ao final da url
  private apiUrl = `${environment.ApiUrl}/Funcionario`

  constructor(private http: HttpClient) { }

  //funcao que vai user o observable pra verificar se existe alguma modificacao na minha classa de response<funcionario>
  //vai receber minha classe generica reponse que trara uma lista de funcionarios 
  //vai retornar uma lista de funcionarios utilizando o molulo de httpCliente com a funcao GET pra pegar a minha lista de funcionarios
  GetFuncionarios() : Observable<Response<Funcionario[]>> {
    return this.http.get<Response<Funcionario[]>>(this.apiUrl);
  }


  GetFuncionario(id : number) : Observable<Response<Funcionario>>{
    return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`);
  }

  CreateFuncionario(funcionario : Funcionario) : Observable<Response<Funcionario[]>>{
    return this.http.post<Response<Funcionario[]>>(`${this.apiUrl}`, funcionario);
  }

  EditarFuncionario(funcionario : Funcionario) : Observable<Response<Funcionario[]>>{
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}`, funcionario)
  }

  ExcluirFuncionario(id: number) : Observable<Response<Funcionario[]>>{
    return this.http.delete<Response<Funcionario[]>>(`${this.apiUrl}?id=${id}`)
  }

InativaFuncionario(id: number) : Observable<Response<Funcionario[]>>{
  return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/InativaFuncionario?id=${id}`, id);
}

}
