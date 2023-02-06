import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/model/item';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ItemService } from 'src/app/core/services/item.service';
import * as moment from 'moment';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() item!: Item;

  flip: string = 'inactive';

  constructor(private modal: NgbModal, config: NgbModalConfig, private itemService: ItemService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  edit(item: Item) {
    let modalRef = this.modal.open(ModalComponent, {centered: true});
    modalRef.componentInstance.isRegister = false;
    modalRef.componentInstance.item = item;
    modalRef.result.then(result => {
      if(result) {
        window.location.reload();
      }
    });
  }

  remove(item: Item) {
    this.itemService.deleteItem(item.id!);
    window.location.reload();
  }

  getDate(date: string) {
    return moment(date).format('DD-MM-YYYY');
  }

  getBackground(tag: string) {
    if(tag == 'baixa') {
      return '#D866C8';
    } else if(tag =='media') {
      return '#CD3173';
    } else if(tag == 'alta') {
      return '#F84C95';
    } else return '#FF207E';
  }

  toggleCheckbox(item: Item) {
    item.done = !item.done;
    this.itemService.editItem(item);
  }

}
