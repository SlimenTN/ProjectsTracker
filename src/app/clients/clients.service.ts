import { Injectable } from '@angular/core';

@Injectable()
export class ClientsService {
    findAll(){
        return [
            {
                id: 1,
                denomination: 'STRAM',
                activity: 'BATIMENT'
            },
            {
                id: 2,
                denomination: 'GREEN DUCK',
                activity: 'AGENCE IMMOBILIERE'
            },
            {
                id: 3,
                denomination: 'SOPELEC',
                activity: null
            },
            {
                id: 4,
                denomination: 'SOMACS',
                activity: 'VENTE MATERIELS VOITURES'
            },
        ];
    }
}