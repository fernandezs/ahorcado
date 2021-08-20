import { Component,Inject  } from '@angular/core';
import { HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * 1 - AL MARCAR DOS VECES UNA PALABRA ERRONEA, EL SISTEMA ME MARCA 
 * DOS ERRORES CUANDO SOLO DEBERIA SER UNO
 * 2 - SI UNA LETRA ES ERRONES, EL SISTEMA ME DEJA CLICKEARLA NUEVAMENTE
 * 3 - IDEM PARA LETRA CORRECTA
 */

export class AppComponent {

  palabra = 'DESOXIRRIBONUCLEICO';
  palabraOculta = ' ';
  juego_iniciado = false;

  intentos = 0;

  gano = false;
  perdio = false;
  document = null;

  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  letras_presionadas = [];

  constructor(@Inject(DOCUMENT) document) {
   this.document = document;   
   
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    let val = String.fromCharCode(event.keyCode).toUpperCase();
      if (this.letras.includes(val) && !this.letras_presionadas.includes(val)) {
        this.comprobar(val);
      }
  }

  comprobar( letra ) {

    this.existeletar(letra); 
   
    const palabraOcultaArr = this.palabraOculta.split(' ');

    console.log( palabraOcultaArr );

    for ( let i = 0; i < this.palabra.length; i ++ ) {

     if ( this.palabra[i] === letra ) {
         palabraOcultaArr[i] = letra;
     }

    }

    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();

  } 
    start() {
      this.juego_iniciado = true;
      this.palabraOculta = '_ '. repeat(this.palabra.length); 
    }



  verificaGane() {

   const palabraOcultaArr = this.palabraOculta.split(' ');
   const palabraEvaluar = palabraOcultaArr.join('');

   if ( palabraEvaluar === this.palabra ) {
   this.gano = true;
   console.log('Usuario GANO');
   } 

   if (this.intentos >=9 ) {
     this.perdio = true;
     console.log('Usuario perdio');
   }

  }


  existeletar( letra ) {
    this.letras_presionadas.push(letra);
    const el = this.document.getElementById(`button-${letra}`);
    el.disabled = true;
    if ( this.palabra.indexOf( letra ) >= 0 ){
     // console.log( ' letra existe ' + letra )
    } else {
     // console.log('letra No existe ' + letra );
      this.intentos ++;
    }

  }

}