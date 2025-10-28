import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { pictureSizeService } from '../../services/pictureSizeService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy{
  form = { email: "", message: "" };
  private _snackbar = inject(MatSnackBar);
  private picture: string[] = ['assets/background/contact-1920px.jpeg'];
  private screenSizeSub = new Subscription();
  currentImagePath = '';

  constructor(private pictureService: pictureSizeService){
    pictureService.setImagesTab(this.picture);
  }

  ngOnInit(): void {
      this.screenSizeSub = this.pictureService.screenSize$.subscribe(() => {
        this.currentImagePath = this.pictureService.currentStaticImage();
      })
  }

  public isFormValid() : boolean {
    return !!this.form.email.trim() && !!this.form.message.trim() && this.form.message.length < 300;
  }

  public onSubmit(){
    this.form.email = "";
    this.form.message = "";

    this._snackbar.open("Demande de contact envoyée avec succès", "ok");
  }

  ngOnDestroy(): void {
      this.screenSizeSub.unsubscribe();
  }
}
