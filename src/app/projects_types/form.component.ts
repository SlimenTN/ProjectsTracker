
import {Component, OnInit, ViewChild} from "@angular/core";
import {ProjectsTypesService} from "./projects-types.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
@Component({
  selector: 'app-projects-type-form',
  templateUrl: 'form.component.html',
  providers: [ProjectsTypesService]
})
export class ProjectsTypeFormComponent implements OnInit{
  title: string;
  form: FormGroup;
  id: number = null;
  @ViewChild('btnSubmit') btn;

  constructor(private fb: FormBuilder,
              private _router: Router,
              private _service: ProjectsTypesService,
              private _activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
    });

    this.initForm();
  }

  initForm(): void{
    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.title = 'Modification';
        this._service.find(this.id).subscribe(type => {
          delete type.id;
          this.form.setValue(type);
        })
      } else {
        this.title = 'Ajout d\'un nouveau type';
      }
    });
  }

  postType(): void {
    const type = this.form.value;
    this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
    this.btn.nativeElement.disabled = true;
    if (this.id == null) {
      console.log('creating', type);
      this._service.create(type).subscribe(response => {
        if (response.persisted) {
          this._router.navigate(['/types-projets']);
          // this.btn.nativeElement.disabled = false;
        } else {
          alert(response.message);
        }
      });
    } else {
      type.id = this.id;
      console.log('updating', type);

      this._service.update(type, this.id).subscribe(response => {
        console.log(response);
        if (response.persisted) {
          this._router.navigate(['/types-projets']);
          // this.btn.nativeElement.disabled = false;
        } else {
          alert(response.message);
        }
      });
    }
  }
}
