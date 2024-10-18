import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap) => {
      let id = paraMap.get('id');
      if (id) {
        this.userId = id;
        console.log('Got ID...', id);
        this.getUser();
      } else {
        console.error('User ID not found');
      }
    });
  }

  async getUser() {
    let userDocRef = doc(this.firestore, 'users', this.userId);
    let userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      let userData = userSnap.data();
      this.user = Object.assign(new User(), userData);
      console.log('Retrieved user', this.user);
    } else {
      console.error('User not found');
    }
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
  }

  editMenu() {
    this.dialog.open(DialogEditAddressComponent);
  }
}
