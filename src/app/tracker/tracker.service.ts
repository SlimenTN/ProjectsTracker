import { Injectable } from '@angular/core';

@Injectable()
export class TrackerService {
    findAll(){
        return [
            {
                project: 'Site web green-duck.tn',
                day: '01/01/2017',
                time: 5,
                typeIntervention: 'Developpement',
                description: 'Developpement de la page "Acheter"',
            },
            {
                project: 'Site web stram.tn',
                day: '01/01/2017',
                time: 3,
                typeIntervention: 'Réglage bug',
                description: 'Problème au niveau de la poage "Panier": client ne peut pas sélectionner des produits',
            },
            {
                project: 'Site web green-duck.tn',
                day: '01/02/2017',
                time: 7,
                typeIntervention: 'Developpement',
                description: 'Developpement de la page "Contact"',
            },
            {
                project: 'Milano Dmcc',
                day: '01/03/2017',
                time: 7,
                typeIntervention: 'Réglage bug',
                description: 'Problème au niveau de l\'impression: codage du serveur.',
            },
            {
                project: 'Application SAV',
                day: '01/04/2017',
                time: 5,
                typeIntervention: 'Réglage bug',
                description: 'Problème au niveau de la page "Ordre de diagnostic"',
            },
            {
                project: 'Site web green-duck.tn',
                day: '01/05/2017',
                time: 7,
                typeIntervention: 'Developpement',
                description: 'Developpement de la page "Louer"',
            },
            {
                project: 'Site web green-duck.tn',
                day: '01/06/2017',
                time: 8,
                typeIntervention: 'Developpement',
                description: 'Developpement de la page "Requêtte"',
            },
            {
                project: 'Site web green-duck.tn',
                day: '01/07/2017',
                time: 8,
                typeIntervention: 'Developpement',
                description: 'Developpement de la page "Nos services"',
            },
            
        ];
    }
}