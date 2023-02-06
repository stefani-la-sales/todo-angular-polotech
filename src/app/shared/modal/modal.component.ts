import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/core/model/item';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Input() isRegister: boolean = true;
  @Input() item?: Item;

  formGroup = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    date: [''],
    tag: ['baixa', Validators.required],
    notes: ['']
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private itemService: ItemService) { }

  ngOnInit(): void {
    if (!this.isRegister && this.item) {
      this.formGroup.patchValue(this.item);
    }
  }

  submitHandler() {
    if (this.formGroup.valid) {
      let formData = this.formGroup.getRawValue() as Item;
      if (this.isRegister) {
        this.itemService.createItem(formData);
      } else {
        this.itemService.editItem(formData);
      }
      this.activeModal.close(true);
    }
  }

}
