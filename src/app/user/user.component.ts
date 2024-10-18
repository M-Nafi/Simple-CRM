import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collectionData, collection } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user = new User();
  users$!: Observable<User[]>; 

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit(): void {
    let usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'customIdName' }) as Observable<User[]>;
    this.users$.subscribe(users => {
      console.log('Received users from Firestore', users);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
