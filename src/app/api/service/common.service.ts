import {Injectable, Injector} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocumentReference} from "@angular/fire/firestore";
import {Tag} from "../model/Tag";
import {QuestionService} from "./question.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(
    private injector: Injector,
    private snackbar: MatSnackBar,
  ) {
  }

  public openSnackbar = (message: string, duration = 5000): void => {
    this.snackbar.open(message, 'Close', {duration});
  }

  public createTags = async (tags: string[], questionService: QuestionService): Promise<DocumentReference<Tag>[]> => {
    if (tags.length === 0) return null;
    let tagList: DocumentReference<Tag>[] = [];
    for (let tag of tags) {
      let databaseTag = await questionService.getTagByName(tag)
      tagList = [...tagList, databaseTag.uid ? databaseTag.ref : await questionService.saveTag(tag)]
    }
    return tagList;
  }

  public getDarkColor = (): string => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
}
