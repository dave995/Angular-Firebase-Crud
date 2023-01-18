import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    length: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  
  first_nam: string = '';
  last_nam: string = '';
  emaile: string = '';
  mobil: string = '';




  constructor(private auth: AuthService, private data: DataService, private afs : AngularFirestore) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  register() {
    this.auth.logout();
  }

  getAllModaluser(student : Student ) {
    this.id = student.id,
    this.first_nam = student.first_name,
    this.last_nam = student.last_name;
    this.emaile = student.email,
    this.mobil = student.mobile
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

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  addStudent() {
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj);
    this.resetForm();

  }

  updateStudent() {
      try{
        this.afs.collection('Students').doc(this.id).update({
          
          first_name: this.first_nam,
          last_name: this.last_nam,
          email: this.emaile,
          mobile: this.mobil
        })

        alert("Update succefully")
        this.resetForm()
      } catch (error) {
        alert(error)
      }
  }

  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.first_name + ' ' + student.last_name + ' ?')) {
      this.data.deleteStudent(student);
    }
  }

}
