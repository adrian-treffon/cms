import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/models/product';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  displayedColumns: string[] = [
    'sku',
    'name',
    'ean',
    'grossPrice',
    'vat',
    'availability',
    'availabilityUnit',
    'leadTime',
    'createdAt',
    'modifiedAt',
    'isActive',
    'category',
    'producer',
    'type'
  ];

  filterBy: any[] = [
    {value: '', viewValue: ''},
    {value: 'SKU', viewValue: 'SKU'},
    {value: 'Name', viewValue: 'Nazwa'},
    {value: 'EAN', viewValue: 'EAN'},
    {value: 'GrossPrice', viewValue: 'Cena brutto'},
    {value: 'VAT', viewValue: 'VAT'},
    {value: 'Availability', viewValue: 'Dostępność'},
    {value: 'Category', viewValue: 'Kategoria'},
    {value: 'Producer', viewValue: 'Producent'},
    {value: 'Type', viewValue: 'Typ'}
  ];
  dataSource!: MatTableDataSource<Product>;
  totalItems!: number;
  pageSize: number = 10;
  page: number = 0;
  orderBy: string = "";
  isDescending: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAll().subscribe((productEnvelope) => {
      this.dataSource = new MatTableDataSource(productEnvelope.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalItems = productEnvelope.productCount;
    });
  }

  private getProducts(limit?: number, offset?: number, orderBy?: string, isDescending?: boolean): void
  {
    this.storeService.getAll(limit, offset, orderBy, isDescending).subscribe((productEnvelope) => {
      this.dataSource = new MatTableDataSource(productEnvelope.products);
      this.totalItems = productEnvelope.productCount;
    });
  }

  applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending);
  }

  sortData(sort: Sort): void {
    this.orderBy = sort.active;
    this.isDescending = sort.direction === 'desc';
    this.page = 0;
    this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending);
  }

  onFilterByChange(event: MatSelectChange): void {
   
  }

}
