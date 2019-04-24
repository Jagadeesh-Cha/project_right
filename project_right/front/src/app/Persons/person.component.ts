import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonService } from '../shared/person.service';
import { Person } from '../shared/person.model';

declare var M: any;

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPersonList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.personService.selectedPerson = {
      _id: "",
      name: "",
      gender: "",
      phoneNumber: "",
      age: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.personService.postPerson(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPersonList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.personService.putPerson(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPersonList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshPersonList() {
    this.personService.getPersonList().subscribe((res) => {
      this.personService.persons = res as Person[];
    });
  }

  onEdit(per: Person) {
    this.personService.selectedPerson = per;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.personService.deletePerson(_id).subscribe((res) => {
        this.refreshPersonList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
