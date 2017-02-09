import 'reflect-metadata';
import test = require('tape');
import {
  component,
  ComponentOptions
} from '../src/index';
import {
  AnimationEntryMetadata,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import extractMetadata from './helpers/extract-metadata';

const template = '<div></div>';

test('@component creates kebab-cased selector excluding "Component" suffix', ({ equal, end }) => {
  @component(template) class DynamicListViewComponent { }

  const metadata = extractMetadata(DynamicListViewComponent);

  equal(metadata.annotations[0].selector, 'dynamic-list-view');

  end();
});

test('@component creates full selector if component suffix is absent from class name', ({ equal, end }) => {
  @component(template) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  equal(metadata.annotations[0].selector, 'dynamic-list-view');

  end();
});

test('@component propagates template to metadata when it is the sole argument', ({ equal, end }) => {
  @component(template) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);
  equal(metadata.annotations[0].template, template);

  end();
});

test('@component propagates template to metadata when it is the first of 2 arguments', ({ equal, end }) => {

  @component(template, {}) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  equal(metadata.annotations[0].template, template);

  end();
});

test('@component propagates template to metadata when specified as the first argument of 3 arguments', ({ deepEqual, end }) => {
  const style = 'h1 { background:"aqua"; }';
  @component(template, style, { providers: [class { }] }) class DynamicListView { }

  const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
  const metadata = metadataKeys.reduce((metadata, key) => {
    metadata[key] = Reflect.getMetadata(key, DynamicListView);
    return metadata;
  }, {});

  deepEqual(metadata.annotations[0].template, template);

  end();
});

test('@component propagates style to styles metadata when specified as the 2nd of 2 arguments', ({ deepEqual, end }) => {
  const style = 'h1 { background: "aqua"; }';

  @component('<div></div>', style) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  deepEqual(metadata.annotations[0].styles, [style]);

  end();
});

test('@component propagates style to styles metadata when specified as the 2nd of 3 arguments', ({ deepEqual, end }) => {
  const style = 'h1 { background: "aqua"; }';

  @component(template, style, { providers: [class { }] }) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  deepEqual(metadata.annotations[0].styles, [style]);

  end();
});

test('@component propagates all options to metadata when options is the 2nd of 2 arguments', ({ deepEqual, end }) => {
  const componentOptions = createPopulatedComponentOptions();

  @component(template, componentOptions) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  Object.keys(componentOptions).forEach((key: keyof extractMetadata.Metadata.Annotation) => {
    console.info(key);
    const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
    deepEqual(componentOptions[key], target);
  });

  end();
});

test('@component propagates all options to metadata when options is the 3rd of 3 arguments', ({ deepEqual, end }) => {
  const style = 'h1 { background:"aqua"; }';
  const template = '<div></div>';

  const componentOptions = createPopulatedComponentOptions();

  @component(template, style, componentOptions) class DynamicListView { }

  const metadata = extractMetadata(DynamicListView);

  Object.keys(componentOptions).forEach((key: keyof extractMetadata.Metadata.Annotation) => {
    console.info(key);
    const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
    deepEqual(componentOptions[key], target);
  });

  end();
});

function createPopulatedComponentOptions(): ComponentOptions & { [key: string]: {} | {}[] } {
  return {
    animations: [new AnimationEntryMetadata('a', [])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'anonymous',
    host: { app: 'src' },
    interpolation: ['x', 'y'],
    moduleId: 'somewhere',
    entryComponents: [class { }],
    providers: [{ provide: 'SomeService', useClass: class Provider { }, multi: false }, [{
      provide: 'SomeServiceViaFactory', useFactory: (dep1: number) => dep1 + 2, deps: [1]
    }]],
    queries: { awake: 'always' },
    viewProviders: [class { }, [class { }]]
  };
}