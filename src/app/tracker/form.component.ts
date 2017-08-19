
import {Component, OnInit, ViewChild} from "@angular/core";
import {TrackerService} from "./tracker.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TrackTypesService} from "../track_types/tracktypes.service";
import {ClientsService} from "../clients/clients.service";
import {ProjectsService} from "../projects/projects.service";
import * as G from '../app.globals';
import {IMultiSelectOption} from "angular-2-dropdown-multiselect";
import {DateValidator} from "../common/date.validator";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-intervention-form',
  templateUrl: 'form.component.html',
  providers: [TrackerService, TrackTypesService, ClientsService, ProjectsService]
})
export class InterventionFormComponent implements OnInit{
  title: string;
  errorMsg: string = null;
  form: FormGroup;
  id: number = null;
  clients: any[] = [];
  projects: any[] = [];
  types: any[] = [];
  @ViewChild('btnSubmit') btn;
  optionsModel: number[];
  myOptions: IMultiSelectOption[] = [];
  dateFormat: string = 'DD-MM-YYYY';

  constructor(private fb: FormBuilder,
              private _router: Router,
              private _service: TrackerService,
              private _typesService: TrackTypesService,
              private _clientsService: ClientsService,
              private _projectsService: ProjectsService,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthenticationService,
  ) {
  }

  onChange() {
    console.log(this.optionsModel);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      interventionDate: ['', Validators.compose([
        Validators.required,
        DateValidator.invalidDate,
      ])],
      project: ['', Validators.compose([
        Validators.required,
      ])],
      clients: [],
      numberHours: ['', Validators.compose([
        Validators.required,
      ])],
      type: ['', Validators.compose([
        Validators.required,
      ])],
      searchIncluded: [],
      source: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.required,
      ])],
    });

    this.initForm();
  }


  initForm(): void{
    this.loadSelectes();
    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.title = 'Modification';
        this._service.find(this.id).subscribe(intervention => {
          delete intervention.id;
          delete intervention.creationDate;
          console.log(intervention.clients);
          this.form.controls.interventionDate.setValue(G.formatDate(intervention.interventionDate.date));
          this.form.controls.project.setValue(intervention.project.id);
          this.form.controls.clients.setValue(this.getClientsIds(intervention.clients));
          this.form.controls.numberHours.setValue(intervention.numberHours);
          this.form.controls.type.setValue(intervention.type.id);
          this.form.controls.searchIncluded.setValue(intervention.searchIncluded);
          this.form.controls.source.setValue(intervention.source);
          this.form.controls.description.setValue(intervention.description);
          // this.form.setValue(intervention);
        })
      } else {
        this.title = 'Ajout d\'une nouvelle intervention';
      }
    });
  }

  getClientsIds(clients){
    let ids = [];
    for (let key in clients) {
      let obj = clients[key];
      ids.push(obj.id);
    }
    return ids;
  }

  loadSelectes(){
    this.loadProjects();
    this.loadClients();
    this.loadTypes();
  }

  loadProjects(){
    this.projects = [];
    this._projectsService.findAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  loadClients(){

    this.clients = [];
    this._clientsService.findAll().subscribe(clients => {
      this.myOptions = [
        { id: 1, name: 'Option 1' },
      ];
      for (let key in clients) {
        let obj = clients[key];
        let o = { id: obj.id, name: obj.denomination};

        this.myOptions.push(o);
      }
      this.myOptions.shift();
      console.table(this.myOptions);
    });
  }

  loadTypes(){
    this.types = [];
    this._typesService.findAll().subscribe(types => {
      this.types = types;
    });
  }

  postIntervention(){
    const intervention = this.form.value;
    intervention.user = this._authService.getUser().id;
    if(intervention.clients === undefined) intervention.clients = null;
    this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
    this.btn.nativeElement.disabled = true;
    if (this.id == null) {
      console.log('creating', JSON.stringify(intervention));
      this._service.create(intervention).subscribe(response => {
        console.log('response', response);
        if (response.persisted) {
          this._router.navigate(['/traqueur']);
          // this.btn.nativeElement.disabled = false;
        } else {
          alert(response.message);
        }
      });
    } else {
      intervention.id = this.id;
      console.log('updating', intervention);

      this._service.update(intervention, this.id).subscribe(response => {
        console.log(response);
        if (response.persisted) {
          this._router.navigate(['/traqueur']);
          // this.btn.nativeElement.disabled = false;
        } else {
          this.errorMsg = response.message;
        }
      });
    }
  }
}
