import { NgFor } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  template : `
  <div  class="mb-4 mx-8 px-8 pt-4  group h-36 relative overflow-hidden 	 bg-white   rounded-xl shadow-sm shadow-slate-500 hover:cursor-pointer hover:shadow-sm hover:shadow-slate-400 hover:scale-105   transition-all duration-300 ease-in-out">
    <p class="text-2xl  font-bold text-purple-300   ">{{title}}</p>
    <div #contentText>
      <p   class="text-gray-900 "> {{content}}</p>
    </div>
    <div #truncator  class="bottom-1 backdrop:pointer-events-none!important   absolute h-8 w-full bg-gradient-to-b from-transparent to-white  "></div>
    <div #truncatorFooter  class="bottom-0 pointer-events-none!important   absolute h-1 w-full bg-white  "></div>

    <svg id="close-svg" (click)="delete()"  class="opacity-0 scale-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-125 transition-all duration-300 ease-in-out   absolute top-2 right-2 bg-red-400 rounded w-6 h-6 fill-current text-white stroke-white stroke-2 hover:bg-red-600  active:bg-red-900   active:transition-none ">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
  </div>
  `,
  standalone: true,
  imports: [NgFor],
})
export class NoteCardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() content!: string;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('truncatorFooter') truncatorFooter: ElementRef<HTMLElement>;
  @ViewChild('contentText') contentText: ElementRef<HTMLElement>;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.truncator = this.elementRef;
    this.contentText = this.elementRef;
    this.truncatorFooter = this.elementRef;
  }

  ngAfterViewInit() {
    const style = window.getComputedStyle(this.contentText.nativeElement, null);
    const viewableHeight = (style.getPropertyValue("height"), 95);
    console.log(viewableHeight);

    if (this.contentText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.truncatorFooter.nativeElement, 'display', 'block');
      console.log('truncator on')
      console.table(this.contentText.nativeElement.scrollHeight);
    } else {

      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.truncatorFooter.nativeElement, 'display', 'none');
      console.log('truncator off')

      console.table(this.contentText.nativeElement.scrollHeight);
    }

  }


  delete() {
    console.log('delete');
  }

}
