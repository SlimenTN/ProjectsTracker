import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectsService} from "./projects.service";
import {ProjectsTypesService} from "../projects_types/projects-types.service";
import * as GLOBAL from '../app.globals';

@Component({
  selector: 'app-project-form',
  templateUrl: 'project-form.component.html',
  providers: [ProjectsService, ProjectsTypesService]
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  id: number = null;
  types: any[];
  typesLoading: boolean = true;
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
      projectDate: ['', Validators.compose([
        Validators.required,
      ])],
      type: ['', Validators.compose([
        Validators.required,
      ])],
      description: [],
    });

    this.loadTypes();
    this.loadProject();

  }

  loadTypes(){
    this._typeProjectsService.findAll().subscribe(types => {
      this.typesLoading = false;
      console.table(types);
      this.types = types;
    });
  }

  loadProject() {
    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.title = 'Modification';
        this._service.find(this.id).subscribe(project => {
          // console.log('client of id ' + id + ': ', client);
          delete project.id;
          delete project.creationDate;
          // console.log('client after deleting id ' + this.id + ': ', client);
          console.log(project);
          this.form.controls.title.setValue(project.title);
          this.form.controls.projectDate.setValue(GLOBAL.formatDate(project.projectDate.date));
          this.form.controls.type.setValue(project.type.id);
          this.form.controls.description.setValue(project.description);
          // this.form.setValue(project);
          console.log(this.form.controls.projectDate);
        })
      } else {
        this.title = 'Ajout d\'un nouveau projet';
      }
    });
  }

  postProject(): void {
    const project = this.form.value;
    this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
    this.btn.nativeElement.disabled = true;
    if (this.id == null) {
      console.log('creating', project);
      this._service.create(project).subscribe(response => {
        if (response.persisted) {
          this._router.navigate(['/projets']);
          // this.btn.nativeElement.disabled = false;
        } else {
          alert(response.message);
        }
      });
    } else {
      project.id = this.id;
      console.log('updating', project);

      this._service.update(project, this.id).subscribe(response => {
        console.log(response);
        if (response.persisted) {
          this._router.navigate(['/projets']);
          // this.btn.nativeElement.disabled = false;
        } else {
          alert(response.message);
        }
      });
    }
  }
}
