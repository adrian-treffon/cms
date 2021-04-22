import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/app/core/models/productType';
import { ProductTypeService } from 'src/app/core/services/product-type.service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss']
})
export class ProductTypeListComponent implements OnInit {

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

  constructor(private readonly productTypeService: ProductTypeService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
   this.refresh();
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

}
