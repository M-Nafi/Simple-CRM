import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  user!: User;
  userId!: string;
  loading = false;
  birthDate!: Date;

  @Output() userUpdated = new EventEmitter<User>(); 

  constructor
  (
    private firestore: Firestore,    
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {}

  ngOnInit(): void {}

  async saveUser() {
    if (this.userId) {
      this.loading = true;
      const userDocRef = doc(this.firestore, 'users', this.userId);
      try {
        await updateDoc(userDocRef, this.user.toJSON());
        console.log('User successfully updated');
        const updatedDoc = await getDoc(userDocRef);
        this.user = updatedDoc.data() as User;
        this.userUpdated.emit(this.user);
        this.dialogRef.close();
      } catch (error) {
        console.error('Fehler beim Speichern des Benutzers:', error);
      } finally {
        this.loading = false;
      }
    } else {
      console.error('Keine Benutzer-ID vorhanden');
    }
  }
}
