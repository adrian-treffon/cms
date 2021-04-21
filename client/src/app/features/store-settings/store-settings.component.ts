import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProducerService } from 'src/app/core/services/producer.service';
import { ProductTypeService } from 'src/app/core/services/product-type.service';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ProducerAddComponent } from './producer-add/producer-add.component';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';

@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.scss']
})
export class StoreSettingsComponent {

  constructor(private readonly dialog: MatDialog, 
              private readonly producerSerivce: ProducerService,
              private readonly categorySerivce: CategoryService,
              private readonly productTypeSerivce: ProductTypeService,
              private readonly toastr: ToastrService) { }

  openAddProducerDialog(): void {
    const dialogRef = this.dialog.open(ProducerAddComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.producerSerivce.add(result).subscribe(() => {
          this.toastr.success('Dodano producenta');
      }, (error) => {
          this.toastr.error('Nie udało się dodać producenta');
      });
    }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.categorySerivce.add(result).subscribe(() => {
          this.toastr.success('Dodano kategorię');
      }, (error) => {
          this.toastr.error('Nie udało się dodać kategorii');
      });
    }
    });
  }

  openAddproductTypeDialog(): void {
    const dialogRef = this.dialog.open(ProductTypeAddComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        console.log(result);
        this.productTypeSerivce.add(result.name, result.parameters).subscribe(() => {
          this.toastr.success('Dodano typ produktu');
      }, (error) => {
          this.toastr.error('Nie udało się dodać typu produktu');
      });
    }
    });
  }
}
