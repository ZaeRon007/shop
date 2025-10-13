import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form = { email: "", message: "" };
  private _snackbar = inject(MatSnackBar);

  public isFormValid() : boolean {
    return !!this.form.email.trim() && !!this.form.message.trim() && this.form.message.length < 300;
  }

  public onSubmit(){
    this.form.email = "";
    this.form.message = "";

    this._snackbar.open("Demande de contact envoyée avec succès", "ok");
  }
}
