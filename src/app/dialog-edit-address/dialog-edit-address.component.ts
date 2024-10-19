import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  userId!: string;
  loading = false;

  @Output() addressUpdated = new EventEmitter<User>();

constructor
(
  private firestore: Firestore, 
  public dialogRef: MatDialogRef<DialogEditAddressComponent>
) {}

  ngOnInit(): void {}

  async saveUser() {
    if (this.userId) {
      this.loading = true;
      const userDocRef = doc(this.firestore, 'users', this.userId); 
  
      updateDoc(userDocRef, this.user.toJSON())
        .then(() => {          
          console.log('User successfully updated'); 
          this.addressUpdated.emit(this.user);                  
          this.dialogRef.close();
        })
        .catch((error) => {
          console.error('Fehler beim Speichern des Benutzers:', error);
        })
        .finally(() => {
          this.loading = false; 
        });
    } else {
      console.error('Keine Benutzer-ID vorhanden');
    }
  }
  
}
