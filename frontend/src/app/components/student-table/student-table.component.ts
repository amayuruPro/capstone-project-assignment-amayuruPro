import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  studentData: any[] = [];
  allStudentData: any[] = []; // backup for resetting after search

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent() {
    this.router.navigate(['addStudent']);
  }

  editStudent(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { id: id }
    };
    this.router.navigate(['editStudent'], navigationExtras);
  }

  getStudentData() {
    this.service.getStudentData().subscribe((response) => {
      this.studentData = Object.keys(response).map((key) => [response[key]]);
      this.allStudentData = [...this.studentData]; // keep original copy
    }, (error) => {
      console.log('ERROR - ', error);
    });
  }

  deleteStudent(itemid: any) {
    const student = { id: itemid };
    this.service.deleteStudent(student).subscribe(() => {
      this.getStudentData();
    });
  }

  search(value: string) {
    const searchTerm = value.toLowerCase().trim();
    if (searchTerm === '') {
      this.studentData = [...this.allStudentData];
    } else {
      this.studentData = this.allStudentData.filter(student =>
        student[0].name.toLowerCase().includes(searchTerm)
      );
    }
  }
}
