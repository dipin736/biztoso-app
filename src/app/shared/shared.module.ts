import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HighlightDirective
  ],
  exports: [HighlightDirective] 
})
export class SharedModule { }
