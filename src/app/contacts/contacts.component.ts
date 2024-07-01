import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ContactService
  ) {
    this.formGroupContact = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      aniversario: ['', Validators.required],
      genero: ['', Validators.required],
      categoria: ['', Validators.required],
      favorito: [false]
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.service.getContacts().subscribe({
      next: (data) => (this.contacts = data),
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupContact.valid) {
      if (this.isEditing) {
        this.service.updateContact(this.formGroupContact.value.id, this.formGroupContact.value).subscribe({
          next: () => {
            this.loadContacts();
            this.isEditing = false;
            this.submitted = false;
            this.formGroupContact.reset();
          },
        });
      } else {
        this.service.createContact(this.formGroupContact.value).subscribe({
          next: (data) => {
            this.contacts.push(data);
            this.submitted = false;
            this.formGroupContact.reset();
          }
        });
      }
    }
  }

  delete(contact: Contact) {
    this.service.deleteContact(contact.id!).subscribe({
      next: () => this.loadContacts(),
    });
  }

  edit(contact: Contact) {
    this.formGroupContact.setValue(contact);
    this.isEditing = true;
  }

  get nome() {
    return this.formGroupContact.get('nome');
  }

  get email() {
    return this.formGroupContact.get('email');
  }

  get telefone() {
    return this.formGroupContact.get('telefone');
  }

  get endereco() {
    return this.formGroupContact.get('endereco');
  }

  get aniversario() {
    return this.formGroupContact.get('aniversario');
  }

  get genero() {
    return this.formGroupContact.get('genero');
  }

  get categoria() {
    return this.formGroupContact.get('categoria');
  }

  get favorito() {
    return this.formGroupContact.get('favorito');
  }
}
