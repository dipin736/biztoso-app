import { HighlightDirective } from './highlight.directive';
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef: ElementRef = new ElementRef(document.createElement('div'));
    const directive = new HighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
