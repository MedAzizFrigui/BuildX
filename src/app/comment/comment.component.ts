import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentDTO} from "../dto/CommentDTO";
import {BackendService} from "../backendService";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  @Input()
  productId: string = '';
  commentsForm: FormGroup;
  commentsDto: CommentDTO[] = [];
  fullName:string="";
  constructor(private backendService: BackendService,
              private matSnackBar: MatSnackBar) {
    this.fullName=this.backendService.getUserName();
    this.commentsForm = new FormGroup({
      comment: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    const comment : string = this.commentsForm.get('comment')?.value;

    const commentDto : CommentDTO = {
      "text": comment,
      "authId": this.backendService.getuserId(),
      "name":this.fullName
    }

    this.backendService.postComment(commentDto, this.productId).subscribe(() => {
      this.matSnackBar.open("Comment Posted Successfully", "OK");

      this.commentsForm.get('comment')?.reset();
      this.getComments();
    })
  }



  getComments() {
    this.backendService.getAllComments(this.productId).subscribe(data => {
      this.commentsDto = data;
    });
  }


}
