import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  constructor(private route: ActivatedRoute,  private firestore: Firestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paraMap => {
      let id = paraMap.get('id');
      if (id) {
        this.userId = id;
        console.log('Got ID...', id);
      } else {
        console.error('User ID not found');
      }
    });
  }
  
}
