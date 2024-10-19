import { Component, input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CollectionReference } from '@firebase/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {}

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    await this.delay(1500);
    try {
      let usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, this.user.toJSON());
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user: ', error);
    } finally {
      this.loading = false;
    }
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
