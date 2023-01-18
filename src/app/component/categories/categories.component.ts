import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Categorie } from 'src/app/model/categorie';
import { Donnee } from 'src/app/model/donnee';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  donneesList: Donnee[] = [];
  donneeObjet: Donnee = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name = '';
  last_name: string = '';


  first_nam: string = '';
  last_nam: string = '';
  emaile: string = '';
  mobil: string = '';



  constructor(private auth: AuthService, private data: DataService, private afs : AngularFirestore) { }

  ngOnInit(): void {
    this.getAllDonnees();
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
  getAllModaluser(donnee : Donnee ) {
    this.id = donnee.id,
    this.first_nam = donnee.first_name,
    this.last_nam = donnee.last_name
 
  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
  }

  addDonnee() {
    if (this.first_name == '' || this.last_name == '') {
      alert(' mettre des element ');
    }

    this.donneeObjet.id = '';
    this.donneeObjet.first_name = this.first_name;
    this.donneeObjet.last_name = this.last_name;

    this.data.addDonnee(this.donneeObjet);
    this.resetForm();
  }

  updateDonnee() {
    try{
      this.afs.collection('Donnees').doc(this.id).update({
        
        first_name: this.first_nam,
        last_name: this.last_nam,
   
      })

      alert("Update succefully")
      this.resetForm()
    } catch (error) {
      alert(error)
    }
  }

  deleteDonnee(donnee: Donnee) {
    if (window.confirm('etes vous sures de vouloir supprimer' + donnee.first_name + ' ' + donnee.last_name + ' ?')) {
      this.data.deleteDonnee(donnee);
    }

  }


}