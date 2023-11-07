import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private validatorService: ValidatorService,
    private errorsService: ErrorsService
  ) { }

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias': '',
      'horaInicio': '',
      'horaFin': '',
      'salon': '',
      'programaEducativo': '',
    }
  }
  
  public validarMateria(data: any){
    console.log("Validando Materia: ", data);
    let error: any = [];
    
    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorsService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorsService.numeric;
    }
    
    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorsService.required;
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorsService.required;
    }else if(!this.validatorService.numeric(data["seccion"])){
      error["seccion"] = this.errorsService.numeric;
    }

    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorsService.required;
    }

    if(!this.validatorService.required(data["horaInicio"])){
      error["horaInicio"] = this.errorsService.required;
    }

    if(!this.validatorService.required(data["horaFin"])){
      error["horaFin"] = this.errorsService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorsService.required;
    }

    if(!this.validatorService.required(data["programaEducativo"])){
      error["programaEducativo"] = this.errorsService.required;
    }

    return error;
  }
}