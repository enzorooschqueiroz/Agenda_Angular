import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact';
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
  showModal: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
    this.formGroupContact = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      telefone: ['', Validators.required],
      endereco: ['',],
      aniversario: ['',],
      genero: ['',],
      categoria: ['',],
      favorito: [false],
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => (this.contacts = data),
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupContact.valid) {
      if (this.isEditing) {
        this.contactService
          .updateContact(this.formGroupContact.value.id, this.formGroupContact.value)
          .subscribe({
            next: () => {
              this.loadContacts();
              this.isEditing = false;
              this.formGroupContact.reset();
              this.closeModal();
              this.submitted = false;
            },
          });
      } else {
        this.contactService.createContact(this.formGroupContact.value).subscribe({
          next: (data) => {
            this.contacts.push(data);
            this.formGroupContact.reset();
            this.closeModal();
            this.submitted = false;
          },
        });
      }
    }
  }

  delete(contact: Contact) {
    this.contactService.deleteContact(contact.id!).subscribe({
      next: () => this.loadContacts(),
    });
  }

  edit(contact: Contact) {
    this.formGroupContact.setValue(contact);
    this.isEditing = true;
    this.openModal();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.formGroupContact.reset();
    this.submitted = false;
  }

  toggleFavorite(contact: Contact) {
    contact.favorito = !contact.favorito;
    this.contactService.updateContact(contact.id!, contact).subscribe({
      next: () => this.loadContacts(),
    });
  }

  get nome(): any {
    return this.formGroupContact.get('nome');
  }

  get email(): any {
    return this.formGroupContact.get('email');
  }

  get telefone(): any {
    return this.formGroupContact.get('telefone');
  }

  get endereco(): any {
    return this.formGroupContact.get('endereco');
  }

  get aniversario(): any {
    return this.formGroupContact.get('aniversario');
  }

  get genero(): any {
    return this.formGroupContact.get('genero');
  }

  get categoria(): any {
    return this.formGroupContact.get('categoria');
  }
}
