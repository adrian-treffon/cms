import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/core/models/customer';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Customer>;
  displayedColumns: string[] = [
    'name',
    'phone',
    'mail',
    'nip',
    'deliveryAddress',
    'address'
  ];
 
  totalItems!: number;
  page = 0;

  constructor(private readonly clientService : ClientService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(clients => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
      this.totalItems = clients.length;
    })
  }

  getDeliveryAddress(client: Customer): string  {
      return `${client.shipAddress.city} ${client.shipAddress.postalCode} ${client.shipAddress.street}`;
  }

  getAddress(client: Customer): string  {
    return `${client.address.city} ${client.address.postalCode} ${client.address.street}`;
}

}
