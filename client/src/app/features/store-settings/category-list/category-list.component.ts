import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  dataSource!: MatTableDataSource<Category>;
  totalItems!: number;
  pageSize: number = 10;
  page: number = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'isActive',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private readonly categoryService: CategoryService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.refresh();
  }
  
  refresh(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.totalItems = categories.length;
    });
  }

  onDeactivateClick(id: number): void {
    this.categoryService.deactivate(id).subscribe(() => {
      this.toastr.success('Deaktywowano kategorię');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się deaktywować kategorii');
  })
  }

  onActivateClick(id: number): void {
    this.categoryService.activate(id).subscribe(() => {
      this.toastr.success('Aktywowano kategorię');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się aktywować kategorii');
  })
  }

}
