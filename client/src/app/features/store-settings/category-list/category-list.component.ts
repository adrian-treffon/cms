import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  
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

  onEditClick(element : Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '250px',
      data : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.categoryService.edit(result).subscribe(() => {
          this.toastr.success('Ok');
          this.refresh();
      }, (error) => {
          this.toastr.error('Nie udało się :(');
      });
    }
    });
  }

}
