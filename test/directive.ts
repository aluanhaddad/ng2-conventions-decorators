import 'reflect-metadata';
import test = require('tape');
import { Directive, Input } from '@angular/core';
import extractMetadata from './helpers/extract-metadata';
import { directive, input } from '../src/index';

test('@directive creates square-bracketed camelCased selector excluding "Directive" suffix', ({equal, end}) => {
  @directive class AutoSlideDirective {
    @input autoSlide = '';
  }

  const {annotations: [{selector}]} = extractMetadata(AutoSlideDirective);

  equal(selector, '[autoSlide]');

  end();
});

test('@directive creates square-bracketed if "Directive" suffix is not present in class name', ({equal, end}) => {
  @directive class AutoSlide {
    @Input() autoSlide = '';
  }

  const {annotations: [{selector}]} = extractMetadata(AutoSlide);

  equal(selector, '[autoSlide]');

  end();
});

test('@directive exports as the camelCased class name excluding the "Directive" suffix', ({equal, end}) => {
  @directive class AutoSlideDirective {
    @Input() autoSlide = '';
  }

  const {annotations: [{selector, exportAs}]} = extractMetadata(AutoSlideDirective);

  equal(exportAs, 'autoSlide');
  equal(selector, '[autoSlide]');

  end();
});

test('@directive exports as the camelCased class name if "Directive" suffix is not present in class name', ({equal, end}) => {
  @directive class AutoSlide {
    @Input() autoSlide = '';
  }

  const {annotations: [{selector, exportAs}]} = extractMetadata(AutoSlide);

  equal(exportAs, 'autoSlide');
  equal(selector, '[autoSlide]');

  end();
});