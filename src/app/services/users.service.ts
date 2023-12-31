import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaUser(){
    return {
      'matricula': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'telefono': '',
      'ocupacion': '',
    }
  }

  public esquemaProduct() {
    return {
      'id': '',
      'product_name': '',
      'price':'',
      'department':''
    }
  }

  //Función para validar datos del usuario
  public validarUsuario(data: any, editar: boolean){
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["matricula"])){
      error["matricula"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }
      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      } 
    }

    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.min(data["curp"], 18)){
      error["curp"] = this.errorService.min(18);
      alert("La longitud de caracteres de la CURP es menor, deben ser 18");
    }else if(!this.validatorService.max(data["curp"], 18)){
      error["curp"] = this.errorService.max(18);
      alert("La longitud de caracteres de la CURP es mayor, deben ser 18");
    }

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato es solo números");
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    return error;
    
  }

  public validarProducto(data: any){
    console.log("Validando product... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["id"])){
      error["id"] = this.errorService.required;
    }
    
    if(!this.validatorService.required(data["product_name"])){
      error["product_name"] = this.errorService.required;
    }else if(!this.validatorService.min(data["product_name"], 3)){
      error["product_name"] = this.errorService.min(3);
      alert("La longitud de caracteres del nombre del producto es menor, deben ser 3");
    }else if(!this.validatorService.max(data["product_name"], 20)){
      error["product_name"] = this.errorService.max(20);
      alert("La longitud de caracteres del nombre del producto es mayor, deben ser 20");
    }

    if(!this.validatorService.required(data["price"])){
      error["price"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["price"])){
      alert("Precio: Ingrese Números");
    }

    if(!this.validatorService.required(data["department"])){
      error["department"] = this.errorService.required;
    }

    return error;
  }

  // Servicios HTTP
  // Servicio para Registar Usuario
  public registrarUsuario (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/users/`,data, httpOptions);
  }

  //obtener Lista
  public obtenerListaUsers (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-users/`, {headers:headers});
  }

  //Obtener Datos Usuario con ID
  public getUserByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/users/?id=${idUser}`,httpOptions); 
  }

  //Actualizar un Usuario
  public editarUsuario (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/users-edit/`, data, {headers:headers});
  }

  //Eliminar Usuario
  public eliminarUsuario(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/users-edit/?id=${idUser}`,{headers:headers});
  }
}