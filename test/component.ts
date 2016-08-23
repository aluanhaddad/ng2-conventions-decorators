import 'reflect-metadata';
import test = require('tape');
import { component, ComponentOptions } from '../index';
import {
    AnimationEntryMetadata, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import extractMetadata from './extract-metadata';

test('@component creates snake cased selector excluding component keyword', tape => {
    @component('<div></div>') class DynamicListViewComponent { }

    const metadata = extractMetadata(DynamicListViewComponent);

    tape.equal(metadata.annotations[0].selector, 'dynamic-list-view');

    tape.end();
});

test('@component creates full selector if component suffix is absent from class name', tape => {
    @component('<div></div>') class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    tape.equal(metadata.annotations[0].selector, 'dynamic-list-view');

    tape.end();
});

test('@component propagates template to metadata when it is the sole argument', tape => {
    const template = '<div></div>';

    @component(template) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);
    tape.equal(metadata.annotations[0].template, template);

    tape.end();
});

test('@component propagates template to metadata when it is the first of 2 arguments', tape => {
    const template = '<div></div>';

    @component(template, {}) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    tape.equal(metadata.annotations[0].template, template);

    tape.end();
});

test('@component propagates template to metadata when specified as the first argument of 3 arguments', tape => {

    const template = '<div></div>'; const style = 'h1 { background:"aqua"; }';
    @component(template, style, { directives: [class { }] }) class DynamicListView { }

    const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, DynamicListView);
        return metadata;
    }, {});

    tape.deepEqual(metadata.annotations[0].template, template);

    tape.end();
});

test('@component propagates style to styles metadata when specified as the 2nd of 2 arguments', tape => {
    const style = 'h1 { background:"aqua"; }';

    @component('<div></div>', style) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    tape.deepEqual(metadata.annotations[0].styles, [style]);

    tape.end();
});

test('@component propagates style to styles metadata when specified as the 2nd of 3 arguments', tape => {
    const style = 'h1 { background:"aqua"; }';

    const template = '<div></div>';

    @component(template, style, { directives: [class { }] }) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    tape.deepEqual(metadata.annotations[0].styles, [style]);

    tape.end();
});

test('@component propagates all options to metadata when options is the 2nd of 2 arguments', tape => {
    const template = '<div></div>';

    const componentOptions = createPopulatedComponentOptions();

    @component(template, componentOptions) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    Object.keys(componentOptions).forEach(key => {
        console.info(key);
        const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
        tape.deepEqual(componentOptions[key], target);
    });

    tape.end();
});

test('@component propagates all options to metadata when options is the 3rd of 3 arguments', tape => {
    const style = 'h1 { background:"aqua"; }';
    const template = '<div></div>';

    const componentOptions = createPopulatedComponentOptions();

    @component(template, style, componentOptions) class DynamicListView { }

    const metadata = extractMetadata(DynamicListView);

    Object.keys(componentOptions).forEach((key, index) => {
        console.info(key);
        const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
        tape.deepEqual(componentOptions[key], target);
    });

    tape.end();
});

function createPopulatedComponentOptions(): ComponentOptions {
    return {
        animations: [new AnimationEntryMetadata('a', [])],
        changeDetection: ChangeDetectionStrategy.OnPush,
        directives: [class { }],
        encapsulation: ViewEncapsulation.None,
        events: ['click'],
        exportAs: 'anonymous',
        host: { 'app': 'src' },
        interpolation: ['x', 'y'],
        moduleId: 'somewhere',
        pipes: [class { transform(value): any { return value; } }],
        entryComponents: [class { }],
        properties: ['abc', '123'],
        providers: [{ provide: 'SomeService', useClass: class Provider { }, multi: false }, [{
            provide: 'SomeServiceViaFactory', useFactory: (dep1) => dep1 + 2, deps: [1]
        }]],
        queries: { awake: 'always' },
        viewProviders: [class { }, [class { }]]
    };
}