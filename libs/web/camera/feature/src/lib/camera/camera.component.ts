import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput') fileInput : ElementRef
  dataUrl : string | undefined | null | ArrayBuffer

  
  constructor(private fb : FormBuilder) { }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
  }
  
  fileInputChange(event: any) {
    console.log(this.fileInput)
    console.log(event)
    if(this.fileInput.nativeElement.files && this.fileInput.nativeElement.files[0]){
      const reader = new FileReader()
      reader.onload = (e) => {
        this.dataUrl = e.target?.result
      }
      reader.readAsDataURL(this.fileInput.nativeElement.files[0])
    }
  }

}
