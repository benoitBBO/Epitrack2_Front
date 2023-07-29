import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  profilForm!:FormGroup;
  passwordForm!:FormGroup;
  passwordControl!:FormControl;
  confirmPasswordControl!:FormControl;
  personalInfoForm!:FormGroup;
  isSubmitted!:boolean;
  modifiedPassword:boolean = false;
  user!:UserModel;
  modifiedUser:UserModel = new UserModel({});

  constructor(private fb:FormBuilder,
              private userService:UserService,
              private msgService:MessageService,
              private router:Router){}

  ngOnInit(){
    this.userService._loggedUser$.subscribe(data => this.user=data);
    
    this.initFormControls();

    this.profilForm = this.fb.group({
      passwords: this.passwordForm,
      personalInfos: this.personalInfoForm
    });
  }

  initFormControls(){
    this.passwordControl = this.fb.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]);
    this.confirmPasswordControl = this.fb.control('', [Validators.required]) ;
    this.passwordForm = this.fb.group({
      userName:[{value:this.user.userName, disabled:true}],
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    },
    { validators: [this.confirmEqualValidator('password', 'confirmPassword')]}
    )

    this.personalInfoForm = this.fb.group({
      email:[this.user.email, [Validators.required, Validators.email]],
      firstName:[this.user.firstName],
      lastName:[this.user.lastName] 
    })
  }

  confirmEqualValidator(main:string, confirm:string): ValidatorFn{
    return (ctl:AbstractControl): null | ValidationErrors => {
      if(!ctl.get(main) || !ctl.get(confirm)){
        return { confirmEqual: "Erreur, les données sont invalides"};
      };
      let mainValue = ctl.get(main)!.value;
      let confirmValue = ctl.get(confirm)!.value;
      if(mainValue === confirmValue){
        return null;   // validator OK
      } else {
        return { confirmEqual: "Erreur, valeurs différentes"};
      };
    };
  }
  
  onClickModifyPassword(){
    this.modifiedPassword = true;
  }

  onClickValidatePassword(){
    this.isSubmitted = true;

    this.modifiedUser = this.user;
    this.modifiedUser.password = this.passwordForm.value.password;

    if(this.passwordForm.valid){
      this.userService.updateUser(this.modifiedUser)
      .subscribe({
        next: (response:any) => {
          this.userService.clearLoggedUserAndSessionStorage();
          this.msgService.show("mot de passe modifié avec succès. Vous devez vous reconnecter", "success");
          this.router.navigate(['/login']);
          //ou rappeler nous même la fonction login pour avoir un nouveau token
          // + findUser pour recharger le saveLoggedUser et recharger le sessionStorage
        }
     })
    }
  }

 
  onClickValidatePersonalData(){

    if(this.modifiedUser.email === this.personalInfoForm.value.email &&
      this.modifiedUser.firstName === this.personalInfoForm.value.firstName &&
      this.modifiedUser.lastName === this.personalInfoForm.value.lastName){
    
        this.msgService.show("Aucune information personnelle modifiée", "info");
    }
    else{
      this.modifiedUser = this.user;
      this.modifiedUser.email = this.personalInfoForm.value.email;
      this.modifiedUser.firstName = this.personalInfoForm.value.firstName;
      this.modifiedUser.lastName = this.personalInfoForm.value.lastName;

      if(this.personalInfoForm.valid){
        this.userService.updateUser(this.modifiedUser)
          .subscribe({
            next: (response:any) => {
              this.msgService.show("infos personnelles modifiées avec succès", "success");
              this.router.navigate(['/user']);
            }
          })
      }   
    }
  }

}
