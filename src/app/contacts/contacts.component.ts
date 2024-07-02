import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  showingFavorites = false;
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  showModal: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private contactService: ContactService
  ) {
    this.formGroupContact = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      telefone: ['', Validators.required],
      endereco: [''],
      aniversario: [''],
      genero: [''],
      categoria: [''],
      favorito: [false],
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    let endpoint = 'http://localhost:8080/contacts';
    if (this.showingFavorites) {
      endpoint = 'http://localhost:8080/contacts/favorites';
    }

    this.http.get<Contact[]>(endpoint).subscribe(
      data => {
        this.contacts = data;
      },
      error => {
        console.error('Erro ao carregar contatos', error);
      }
    );
  }

  toggleFavorites() {
    this.showingFavorites = !this.showingFavorites;
    this.loadContacts();
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
            error: error => {
              console.error('Erro ao atualizar contato', error);
              this.submitted = false;
            }
          });
      } else {
        this.contactService.createContact(this.formGroupContact.value).subscribe({
          next: (data) => {
            this.contacts.push(data);
            this.formGroupContact.reset();
            this.closeModal();
            this.submitted = false;
          },
          error: error => {
            console.error('Erro ao criar contato', error);
            this.submitted = false;
          }
        });
      }
    }
  }

  delete(contact: Contact) {
    this.contactService.deleteContact(contact.id!).subscribe({
      next: () => this.loadContacts(),
      error: error => {
        console.error('Erro ao deletar contato', error);
      }
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
      error: error => {
        console.error('Erro ao atualizar favorito', error);
      }
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
