import { Component, OnInit } from '@angular/core';
import { Produiction } from '../model/produiction';
import { Data } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Donnee } from 'src/app/model/donnee';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

     produictionList : Produiction[] = [];
     donneesList : Donnee[] = [];
     produictionObj : Produiction = {
       id: '',
       produit_title: '',
       produit_prix: '',
       categori : ''
     };

     id : string = '';
     produit_title : string = '';
     produit_prix : string = '';
     categori : string = '' ;

    
     produit_titl : string = '';
     produit_pri : string = '';
     categor : string = '' 
 
  

  constructor(private auth : AuthService, private data : DataService, private afs : AngularFirestore) { }

  ngOnInit(): void {
    this.getAllProduictions();
    this.getAllDonnees();
    

  }
  UserList: any = [];
  userToEdit: any;
  
  getAllModaluser(produit : Produiction ) {
    this.id = produit.id,
    this.produit_titl = produit.produit_title,
    this.produit_pri = produit.produit_prix
 
  }

  getAllDonnees(){
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

  resetForm() {
    this.id  = '';
    this.produit_title = '';
    this.produit_prix = '';
  }

  addProduiction() {
     if(this.produit_title == '' || this.produit_prix == '' || this.categori == '') {
      alert('fill all in inputs fiels');
      return;
     
     }
     
     this.produictionObj.id = '';
     this.produictionObj.produit_title = this.produit_title;
     this.produictionObj.produit_prix = this.produit_prix;
     this.produictionObj.categori = this.categori

     this.data.addProduiction(this.produictionObj);
     this.resetForm();
    
  }

  updateProduiction() {
    try{
      this.afs.collection('Produictions').doc(this.id).update({
        
        produit_title: this.produit_titl,
        produit_prix: this.produit_pri,
   
      })

      alert("Update succefully")
      this.resetForm()
    } catch (error) {
      alert(error)
    }
  }

  deleteProduiction(produiction : Produiction) {
    // if (window.confirm('Are you sure you want to delete ' +produiction.first_name + ' ' +produiction.last_name + ' ?')) {
    //   this.data.deleteProduiction(produiction);
    // }
   if(window.confirm('etes vous sure de vouloir supprimer '+produiction.produit_prix + ' ' +produiction.produit_title + ' ?')) {
     this.data.deleteProduiction(produiction)
   }
  }

}
