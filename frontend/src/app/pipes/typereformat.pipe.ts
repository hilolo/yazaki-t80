import { Pipe, PipeTransform, Output } from '@angular/core';



@Pipe({
  name: 'typereformat'
})
export class TypereformatPipe implements PipeTransform {

  transform(value: number): string {

    let Output:string;
    switch(value) { 
      case 1: { 
         Output='Production';
         break; 
      } 
      case 2: { 
         Output='Quality';
         break; 
      } 
      case 3: { 
        Output='Prototype';
        break; 
     } 
      case 4: { 
         Output='Maintenance';
         break; 
      } 
      case 5: {  
        Output='Process';
        break; 
     } 
     case 6: {  
      Output='ENG';
      break; 
   } 
   case 7: {  
    Output='PLPP';
    break; 
 } 
 case 8: {  
   Output='Logistique';
   break; 
} 
  

      default: { 
        Output='Administrator ';
         break; 
      } 
   } 


    return Output;
  }

}
