import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrderProduct } from 'src/app/core/models/orderProduct';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.scss']
})
export class DeliveriesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Order>;
  displayedColumns: string[] = [
    'createdAt',
    'customer',
    'ilość towarów',
    'kwota',
    'przewoźnik',
    'koszt wysyłki',
    'numer listu',
    'ubezpieczono',
    'actions'
  ];
  totalItems!: number;
  page = 0;
  constructor(private readonly orderService: OrderService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.orderService.getAll('2').subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.totalItems = orders.length;
    });
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

  onEditBtnClick(order: Order): void {
    this.router.navigate([`orders/${order.id}`], { state: { order } });
  }

}
