import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@my-app/shared/util/dto';
import { CategoryModalComponent, ConfirmDeleteComponent } from '@my-app/web/invoice/ui/category-table';
import { CategoryService } from '@my-app/web/shared/category/data-access';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'my-app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<CategoryDto[]>
  constructor(private service: CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.categories$ = this.service.getCategories()
  }

  addCategory(category: CategoryDto | undefined = undefined) {
    const modalRef = this.modalService.open(CategoryModalComponent)
    if(category !== undefined) {
      modalRef.componentInstance.category = category
    }
    modalRef.closed.pipe(
      switchMap(value => this.service.save(value))
    ).subscribe(res => console.log("save category response",res))
  }

  confirmDelete(category: CategoryDto) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent)
    modalRef.componentInstance.category = category
    modalRef.componentInstance.deleteClick.pipe(
      switchMap(id => this.service.delete(Number(id)))
    ).subscribe(() => modalRef.close(), 
    (err: HttpErrorResponse) => modalRef.componentInstance.error = err.message)
  }

}
