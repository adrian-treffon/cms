import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrderProduct } from 'src/app/core/models/orderProduct';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
  order!: Order;
  loaded: boolean = false;
  dataSource!: MatTableDataSource<OrderProduct>;
  displayedColumns: string[] = [
    'name',
    'sku',
    'ean',
    'grossPrice',
    'quantity',
    'vat'
  ];

  constructor(private readonly router: Router,
              private route: ActivatedRoute,
              private readonly orderService: OrderService) {
    const order = this.router.getCurrentNavigation()?.extras.state?.order;
    if (order) {
      this.order = order;
      this.loaded = true;
      this.dataSource = new MatTableDataSource(order.products);
     } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.orderService.getById(id!).subscribe(order => {
        this.order = order;
        this.dataSource = new MatTableDataSource(order.products);
        this.loaded = true;
      });
     }
   }

  ngOnInit(): void {
  }


  getDate(date: Date): string
  {
      return new Date(date).toLocaleString('pl-PL')
  }

  changeStatus(status: number): void
  {
    this.orderService.changeStatus(status, this.order.id).subscribe(() => {
      this.router.navigateByUrl('orders');
    });
  }
}
