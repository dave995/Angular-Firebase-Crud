import { Component, OnInit } from '@angular/core';
import { Produiction } from '../component/model/produiction';
import { Donnee } from '../model/donnee';
import { Student } from '../model/student';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-frontdasboard',
  templateUrl: './frontdasboard.component.html',
  styleUrls: ['./frontdasboard.component.css']
})
export class FrontdasboardComponent implements OnInit {
  donneesList : Donnee[] = [];
  studentsList: Student[] = [];
  produictionList : Produiction[] = [];
  
  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllDonnees();
    this.getAllStudents();
    this.getAllProduictions()
    
  }
  getAllDonnees() {

    this.data.getAllDonnees().subscribe(res => {

      this.donneesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('erreur de votre saisi')
    })
  }

  getAllStudents() {

    this.data.getAllStudents().subscribe(res => {

      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
    
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }
  getAllProduictions() {
    this.data.getAllProduictions().subscribe(res => {

      this.produictionList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching produit data');
    })


   
  }


}
