import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  dataSource!: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'id',
    'createdAt',
    'customer',
    'status'
  ];
  totalItems!: number;
  page: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.totalItems = orders.length;
    });
  }

}
