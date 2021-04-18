import { SelectionModel } from '@angular/cdk/collections';
import { Route } from '@angular/compiler/src/core';
import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit, OnDestroy{
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
    'type',
    'actions'
  ];
  filterByOptions: any[] = [
    {value: '', viewValue: ''},
    {value: 'SKU', viewValue: 'SKU'},
    {value: 'Name', viewValue: 'Nazwa'},
    {value: 'EAN', viewValue: 'EAN'},
    {value: 'Category.Name', viewValue: 'Kategoria'},
    {value: 'Producer.Name', viewValue: 'Producent'},
    {value: 'Type.Name', viewValue: 'Typ'}
  ];
  dataSource!: MatTableDataSource<Product>;
  totalItems!: number;
  pageSize: number = 10;
  page: number = 0;
  orderBy: string = "";
  isDescending: boolean = false;
  filterBy: string = "";
  searchedPhrase: string = "";
  term$ = new Subject<string>();
  searchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly storeService: StoreService,
              private readonly router: Router) {
    this.searchSubscription = this.term$.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(term => {
        this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending, this.filterBy, this.searchedPhrase);
        return EMPTY;
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.storeService.getAll().subscribe((productEnvelope) => {
      this.dataSource = new MatTableDataSource(productEnvelope.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalItems = productEnvelope.productCount;
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // tslint:disable-next-line: max-line-length
  private getProducts(limit?: number, offset?: number, orderBy?: string, isDescending?: boolean, filterBy?: string, searchedPhrase?: string): void
  {
    this.storeService.getAll(limit, offset, orderBy, isDescending, filterBy, searchedPhrase).subscribe((productEnvelope) => {
      this.dataSource = new MatTableDataSource(productEnvelope.products);
      this.totalItems = productEnvelope.productCount;
    });
  }

  applyFilter(event: Event) : void {
    this.searchedPhrase = (event.target as HTMLInputElement).value;
    this.term$.next(this.searchedPhrase);
  }

  handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending, this.filterBy, this.searchedPhrase);
  }

  sortData(sort: Sort): void {
    this.orderBy = sort.active;
    this.isDescending = sort.direction === 'desc';
    this.page = 0;
    this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending, this.filterBy, this.searchedPhrase);
  }

  onFilterByChange(event: MatSelectChange): void {
    this.filterBy =  event.value;
    this.getProducts(this.pageSize, this.page * this.pageSize, this.orderBy, this.isDescending, this.filterBy, this.searchedPhrase);
  }

  onEditBtnClick(product: Product): void {
    this.router.navigate([`store/${product.id}`], { state: { product } });
  }
}
