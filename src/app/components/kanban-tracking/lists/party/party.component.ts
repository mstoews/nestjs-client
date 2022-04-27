import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanService } from '../../module/kanban.service';
import { KanbanRefService } from '../../module/kanban-party-ref.service';

export interface PartyType {
  party_ref: string;
  client_ref: string;
  party_type: string;
  party_short_name: string;
  party_long_name: string;
  party_extra_long_name: string;
  version_date: string;
  version_no: number;
  version_user: string;
}

export type Query = {
  partyByType: PartyType[];
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'party-list',
  templateUrl: './party.component.html',
})
export class PartyListComponent {
  kanbanList!: Observable<PartyType[]>;
  partyRef: string;
  clientRef: string;

  constructor(
    private kanbanService: KanbanService,
    kanbanRefService: KanbanRefService
  ) {
    const client = localStorage.getItem('CLIENT');
    this.kanbanList = this.kanbanService.getPartyByRefAndClient('COMP', client);
    kanbanRefService.kanbanRefUpdated.subscribe((ref) => {
      this.partyRef = ref.getPartyRef();
      this.clientRef = ref.getClientRef();
      //  console.log ('PartyListComponent: ', this.partyRef);
    });
  }

  logEvent(e) {
    //  console.log (e);
  }

  onRowDblClick(e) {
    //  console.log ('Double clicked', e.data);
  }
}