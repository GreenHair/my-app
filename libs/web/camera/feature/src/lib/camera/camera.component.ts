import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createWorker } from "tesseract.js";
import * as Tesseract from 'tesseract.js';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'my-app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('fileInput') fileInput : ElementRef
  dataUrl : any

  progress : number = 0

  worker : Tesseract.Worker = createWorker({
    logger : m => {
      console.log("progress", m)
      if(m.status == 'recognizing text' && m.progress > 0){
        this.progress = m.progress * 100
      }
    },
    langPath: 'apps/my-app/src/assets'
  })
  isReady: boolean = false
  text : string
  error = false
  errorText = ""
  
  constructor(private fb : FormBuilder) { }
  
  ngOnInit(): void {
    this.initialize()
  }
  
  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.worker.terminate()
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

  async initialize(): Promise<void> {
    await this.worker.load();
    await this.worker.loadLanguage("deu");
    await this.worker.initialize("deu");
    this.isReady = true;
  }

  async ocr(){
    try{
      this.progress = 100
      const result = await this.worker.recognize(this.dataUrl)
      this.text = result.data.text
      console.log(result)
      const lines = result.data.lines.map(line => line.text)
      console.log(JSON.stringify(lines))
    } catch (exception) {
      this.error = true
      this.errorText = JSON.stringify(exception)
      console.log(exception)
    }
  }

}
