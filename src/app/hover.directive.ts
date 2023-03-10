import {Directive, ElementRef, Input, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[ngpHover]'
})
export class HoverDirective implements OnInit{
  @Input() color?: string = 'red';
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() { // HostListener is a decorator that allows us to listen to events on the host element
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.color);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'white');
  }

  ngOnInit() {
  }
}
