
import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectsService} from "./projects.service";
import {ProjectsTypesService} from "../projects_types/projects-types.service";

@Component({
  selector: 'app-project-form',
  templateUrl: 'project-form.component.html',
  providers: [ProjectsService, ProjectsTypesService]
})
export class ProjectFormComponent implements OnInit{
  form: FormGroup;
  title: string;
  id: number = null;
  types: any[];
  @ViewChild('btnSubmit') btn;

  constructor(private fb: FormBuilder,
              private _router: Router,
              private _service: ProjectsService,
              private _typeProjectsService: ProjectsTypesService,
              private _activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      date: ['', Validators.compose([
        Validators.required,
      ])],
      type: ['', Validators.compose([
        Validators.required,
      ])],
      description: [],
    });

    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if(id !== undefined){
        this.id = id;
        this.title = 'Modification';
        // TODO: find project by id and display it in the form
      }else{
        this.title = 'Ajout d\'un nouveau projet';
      }
    });

    this._typeProjectsService.findAll().subscribe(types => {
        console.table(types);
        this.types = types;
    });
  }

  postProject(): void{
    const project = this.form.value;
    this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
    this.btn.nativeElement.disabled = true;
    if (this.id == null) {
      // TODO: create new project
      // this._service.createNewClient(client).subscribe(response => {
      //   if (response.persisted) {
      //     this._router.navigate(['/clients']);
      //     // this.btn.nativeElement.disabled = false;
      //   }
      // });
    }else{
      console.log('updating..');
      project.id = this.id;
      // TODO: update project
      // this._service.updateClient(client).subscribe(response => {
      //   console.log(response);
      //   if (response.persisted) {
      //     this._router.navigate(['/clients']);
      //     // this.btn.nativeElement.disabled = false;
      //   }else{
      //     alert(response.message);
      //   }
      // });
    }
  }
}
