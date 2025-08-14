import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  teacherData: any[] = [];
  allTeacherData: any[] = []; // backup for resetting after search

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id: any) {
    const navigationExtras: NavigationExtras = {
      state: { id: id }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  getTeacherData() {
    this.service.getTeacherData().subscribe((response) => {
      this.teacherData = Object.keys(response).map((key) => [response[key]]);
      this.allTeacherData = [...this.teacherData]; // keep original copy
    }, (error) => {
      console.log('ERROR - ', error);
    });
  }

  deleteTeacher(itemid: any) {
    const teacher = { id: itemid };
    this.service.deleteTeacher(teacher).subscribe(() => {
      this.getTeacherData();
    });
  }

  search(value: string) {
    const searchTerm = value.toLowerCase().trim();
    if (searchTerm === '') {
      this.teacherData = [...this.allTeacherData];
    } else {
      this.teacherData = this.allTeacherData.filter(teacher =>
        teacher[0].name.toLowerCase().includes(searchTerm)
      );
    }
  }
}
