import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/core/model/item';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];

  constructor(private modal: NgbModal, config: NgbModalConfig, private itemService: ItemService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.items = this.itemService.getAllItems();
  }

  open() {
    let modalRef = this.modal.open(ModalComponent,{ centered: true });
    modalRef.result.then(result => {
      if(result) {
        window.location.reload();
      }
    });
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

}
