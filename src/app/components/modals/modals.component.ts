import { Component, Input, Output, EventEmitter } from '@angular/core';


import { TypeOfModal } from "app/index";
import { ModalsService, AuthService } from "app/index";



@Component({
  selector: 'modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {


    @Input() tempCase: TypeOfModal; 

    @Output() openModal: EventEmitter<any> = new EventEmitter();
    @Output() closeModal: EventEmitter<any> = new EventEmitter();

    typeOfModal = TypeOfModal;
    key;


    constructor(private authService: AuthService, private modalsService: ModalsService){
      console.log( " constructor of modal ", typeof this.typeOfModal);
    }

    ngOnInit(){
      this.modalsService.listenerOfOpen().subscribe((tempCase: TypeOfModal): void=>{
          this.tempCase = tempCase;
      });
    }

    openModalEvent(tempCase: TypeOfModal): void {
      this.openModal.emit(tempCase);
      this.modalsService.senderOfOpen(tempCase);
    }

    closeModalEvent(): void {
      delete this.tempCase
      this.closeModal.emit(this.tempCase);
    }

    changeKey( key: string ): void {
      let newKey: string = "";
      for (let i:number = 0; i < key.length; i++){
        let c = +key[i];
        if ( typeof c === "number" && c === c ) {
          newKey += key[i];
        };
      }
      console.log(newKey);
      this.key = newKey;
    }


}