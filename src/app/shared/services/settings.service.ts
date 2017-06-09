import { Injectable } from '@angular/core';


@Injectable()
export class SettingService {

    private static instance: SettingService; // instance of Singleton 

    constructor(){
        return SettingService.instance ? SettingService.instance : this;
    }

}