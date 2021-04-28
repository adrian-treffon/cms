import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { Producer } from 'src/app/core/models/producer';
import { ProducerService } from 'src/app/core/services/producer.service';
import { ProducerFormComponent } from '../producer-form/producer-form.component';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit, OnDestroy {
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;

  dataSource!: MatTableDataSource<Producer>;
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

  constructor(private readonly producerService: ProducerService,
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
    this.producerService.getAll().subscribe((producers) => {
      this.dataSource = new MatTableDataSource(producers);
      this.dataSource.paginator = this.paginator;
      this.totalItems = producers.length;
    });
  }

  onDeactivateClick(id: number): void {
    this.producerService.deactivate(id).subscribe(() => {
      this.toastr.success('Deaktywowano producenta');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się deaktywować producenta');
  })
  }

  onActivateClick(id: number): void {
    this.producerService.activate(id).subscribe(() => {
      this.toastr.success('Aktywowano producenta');
      this.refresh();
  }, (error) => {
      this.toastr.error('Nie udało się aktywować producenta');
  })
  }

  onEditClick(element : Producer): void {
    const dialogRef = this.dialog.open(ProducerFormComponent, {
      width: '250px',
      data : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.producerService.edit(result).subscribe(() => {
          this.toastr.success('Ok');
          this.refresh();
      }, (error) => {
          this.toastr.error('Nie udało się :(');
      });
    }
    });
  }

}
