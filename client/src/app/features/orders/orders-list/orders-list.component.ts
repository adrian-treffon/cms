import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrderProduct } from 'src/app/core/models/orderProduct';
import {  OrderStatusPL } from 'src/app/core/models/orderStatus';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'id',
    'createdAt',
    'customer',
    'status',
    'ilość towarów',
    'kwota',
    'przewoźnik',
    'actions'
  ];
  view = '0';
  totalItems!: number;
  page = 0;

  constructor(private readonly orderService: OrderService,
              private readonly router: Router) { }

  ngOnInit(): void {
   this.changeView();
  }

  getStatus(statusType: number): string {
    return OrderStatusPL[statusType];
  }

  getQuantity(products : OrderProduct[]): number
  {
    let sum = 0 ;
    products.forEach(x => sum += x.quantity)
    return sum;
  }

  getPrice(products : OrderProduct[]): number
  {
    let sum = 0 ;
    products.forEach(x => sum += x.grossPrice * x.quantity);
    return sum;
  }

  changeView(): void {
    this.orderService.getAll(this.view).subscribe((orders) => {
      console.log(orders)
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.totalItems = orders.length;
    });
  }

  onEditBtnClick(order: Order): void {
    this.router.navigate([`orders/${order.id}`], { state: { order } });
  }

}
