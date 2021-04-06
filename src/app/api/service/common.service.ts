import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  public openSnackbar = (message: string, duration = 5000): void => {
    this.snackbar.open(message, 'Close', {duration});
  }
}
