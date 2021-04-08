import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackbar: MatSnackBar,
  ) {
  }

  public openSnackbar = (message: string, duration = 5000): void => {
    this.snackbar.open(message, 'Close', {duration});
  }

  public generateRandomColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
