import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',

})
export class HighlightDirective implements OnInit {

  @Input() leadStatus: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.leadStatus.toLowerCase() === 'new') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e0ffe0'); // Light green background
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid green'); // Left border for emphasis
      this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
    }
  }
}