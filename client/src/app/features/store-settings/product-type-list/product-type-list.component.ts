import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ProductType } from 'src/app/core/models/productType';
import { ProductTypeService } from 'src/app/core/services/product-type.service';
import { ProductTypeFormComponent } from '../product-type-form/product-type-form.component';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss']
})
export class ProductTypeListComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<ProductType>;
  totalItems!: number;
  pageSize: number = 10;
  page: number = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'parameters',
    'isActive',
    'actions'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;

  constructor(private readonly productTypeService: ProductTypeService,
              private readonly toastr: ToastrService,
              private readonly dialog: MatDialog) {}

  ngOnInit(): void {
   this.refresh();
   this.eventsSubscription = this.events.subscribe(() => this.refresh());
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  refresh(): void {
    this.productTypeService.getAll().subscribe((productTypes) => {
      this.dataSource = new MatTableDataSource(productTypes);
      this.dataSource.paginator = this.paginator;
      this.totalItems = productTypes.length;
    });
  }

  onDeactivateClick(id: number): void {
    this.productTypeService.deactivate(id).subscribe(() => {
      this.toastr.success('Deaktywowano typ produktu');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się deaktywować typu produktu');
  })
  }

  onActivateClick(id: number): void {
    this.productTypeService.activate(id).subscribe(() => {
      this.toastr.success('Aktywowano typ produktu');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się aktywować typu produktu');
  })
  }

  onEditClick(element : ProductType): void {
    const dialogRef = this.dialog.open(ProductTypeFormComponent, {
      width: '400px',
      data : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.productTypeService.edit(result).subscribe(() => {
          this.toastr.success('Ok');
          this.refresh();
      }, (error) => {
        console.log(error)
          this.toastr.error('Nie udało się :(');
      });
    }
    });
  }

}
