import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrderProduct } from 'src/app/core/models/orderProduct';
import { OrderStatusPL } from 'src/app/core/models/orderStatus';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<Order>;

  displayedColumns: string[] = [
    'id',
    'createdAt',
    'customer',
    'ilość towarów',
    'kwota',
    'przewoźnik',
    'actions'
  ];
  saleData = [{
    "name": "Germany",
    "series": [
      {
        "name": "10.05.2021",
        "value": 10
      },
      {
        "name": "11.05.2021",
        "value": 12
      },
      {
        "name": "12.05.2021",
        "value": 6
      }
    ]
  }]

  saleAmount = [{
    "name": "Germany",
    "series": [
      {
        "name": "10.05.2021",
        "value": 10532
      },
      {
        "name": "11.05.2021",
        "value": 15543
      },
      {
        "name": "12.05.2021",
        "value": 890
      }
    ]
  }]

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


  colorScheme = {
    domain: ['#1d67c2']
  };

  constructor(private readonly orderService: OrderService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.orderService.getAll('0').subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders);
    });
  }

  onEditBtnClick(order: Order): void {
    this.router.navigate([`orders/${order.id}`], { state: { order } });
  }

}
