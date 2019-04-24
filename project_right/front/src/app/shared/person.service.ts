import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from './person.model';

@Injectable()
export class PersonService {
  selectedPerson: Person;
  persons: Person[];
  readonly baseURL = 'http://localhost:3000/persons';

  constructor(private http: HttpClient) { }

  postPerson(per: Person) {
    return this.http.post(this.baseURL, per);
  }

  getPersonList() {
    return this.http.get(this.baseURL);
  }

  putPerson(per: Person) {
    return this.http.put(this.baseURL + `/${per._id}`, per);
  }

  deletePerson(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
