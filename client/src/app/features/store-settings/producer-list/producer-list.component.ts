import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Producer } from 'src/app/core/models/producer';
import { ProducerService } from 'src/app/core/services/producer.service';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit {

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
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
   this.refresh();
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

}
