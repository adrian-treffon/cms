import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProducerService } from 'src/app/core/services/producer.service';
import { ProductTypeService } from 'src/app/core/services/product-type.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProducerFormComponent } from './producer-form/producer-form.component';
import { ProductTypeFormComponent } from './product-type-form/product-type-form.component';

@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.scss']
})
export class StoreSettingsComponent {
  view: string = 'producers';
  eventsSubject: Subject<void> = new Subject<void>();
  
  constructor(private readonly dialog: MatDialog, 
              private readonly producerSerivce: ProducerService,
              private readonly categorySerivce: CategoryService,
              private readonly productTypeSerivce: ProductTypeService,
              private readonly toastr: ToastrService) { }

  openAddProducerDialog(): void {
    const dialogRef = this.dialog.open(ProducerFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.producerSerivce.add(result.name).subscribe(() => {
          this.toastr.success('Dodano producenta');
          this.emitEventToChild();
      }, (error) => {
          this.toastr.error('Nie udało się dodać producenta');
      });
    }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.categorySerivce.add(result.name).subscribe(() => {
          this.toastr.success('Dodano kategorię');
          this.emitEventToChild();
      }, (error) => {
          this.toastr.error('Nie udało się dodać kategorii');
      });
    }
    });
  }

  openAddProductTypeDialog(): void {
    const dialogRef = this.dialog.open(ProductTypeFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.productTypeSerivce.add(result.name, result.parameters).subscribe(() => {
          this.toastr.success('Dodano typ produktu');
          this.emitEventToChild();
      }, (error) => {
          this.toastr.error('Nie udało się dodać typu produktu');
      });
    }
    });
  }

  emitEventToChild(): void {
    this.eventsSubject.next();
  }
}
