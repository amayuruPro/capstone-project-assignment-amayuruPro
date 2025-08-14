import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    if(environment.production == false){
      this.ROOT_URL = 'test'
    }else{
      this.ROOT_URL = 'api'
    }
  }

  initializeDB(){
    return this.http.get(`/api/dbinitialize`)
  }

  getTeacherData(){
    return this.http.get(`/api/listTeachers`)
  }

  getStudentData(){
    return this.http.get(`/${this.ROOT_URL}/listStudents`)
  }

  getOneStudentData(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/getStudentInfo`, payload)
  }

  getOneTeacherData(payload: Object){
    return this.http.post(`/api/getTeacherInfo`, payload)
  }

  addTeacher(payload: Object){
    return this.http.post(`/api/addTeacher`, payload)
  }

  deleteTeacher(payload: Object){
    return this.http.post(`/api/deleteTeacher`, payload)
  }

  editTeacher(payload: Object){
    return this.http.post(`/api/editTeacher`, payload)
  }

  editStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/editStudent`, payload)
  }

  addStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/addStudent`, payload)
  }

  deleteStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/deleteStudent`, payload)
  }
}