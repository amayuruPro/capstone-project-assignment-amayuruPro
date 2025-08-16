import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;
  private originalStudentData: any; // Store original data

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = Object.keys(response).map((key) => [response[key]]);
      this.originalStudentData = [...this.studentData]; // Save original data
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

  search(value) {
    if (!value || value.length <= 0) {
      // Restore original data if search is empty
      this.studentData = [...this.originalStudentData];
    } else {
      // Filter studentData by name (case-insensitive)
      const searchTerm = value.toLowerCase();
      this.studentData = this.originalStudentData.filter((student: any) =>
        student[0].name.toLowerCase().indexOf(searchTerm) > -1
      );
    }
  }
}
