import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';


import {EmployeeService } from '../shared/employee.service';

import { Employee } from '../shared/employee.model'

declare var M : any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers :[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService :EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.getEmployeeList();
  }
resetForm(form?: NgForm){
if(form)
  form.reset();
  this.employeeService.selectedEmployee = {
    _id :"",
    name: "",
    position:  "",
    office: "",
    salary: null,
  }
}

onSubmit(form ?:NgForm){
  if(form.value._id==""){
this.employeeService.postEmployee(form.value).subscribe((res) => {
  M.toast({html: 'saved succesfully' , classes :'rouned'})
  this.getEmployeeList();
});
  }else{
    this.employeeService.updateEmployee(form.value).subscribe((res) => {
      M.toast({html: 'updated succesfully' , classes :'rouned'})
      this.getEmployeeList();
    });
  }
}


getEmployeeList(){
  this.employeeService.getEmployeeList().subscribe((res) => {
    this.employeeService.employees=res as Employee[];
  });
  }

  onEdit(emp :Employee){
   this.employeeService.selectedEmployee=emp;
  }
delete(_id :string,form:NgForm)
{
  if(confirm('Are you sure to delete this record')==true){
  this.employeeService.deleteEmployee(_id).subscribe((res) => {
    M.toast({html: 'deleted succesfully' , classes :'rouned'})
    this.getEmployeeList();
    this.resetForm();

  });
}
}
}
