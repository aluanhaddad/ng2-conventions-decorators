"use strict";
const tslib_1 = require("tslib");
require("reflect-metadata");
const test = require("tape");
const index_1 = require("../index");
const core_1 = require("@angular/core");
const extract_metadata_1 = require("./helpers/extract-metadata");
const template = '<div></div>';
test('@component creates kebab-cased selector excluding "Component" suffix', ({ equal, end }) => {
    let DynamicListViewComponent = class DynamicListViewComponent {
    };
    DynamicListViewComponent = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListViewComponent);
    const metadata = extract_metadata_1.default(DynamicListViewComponent);
    equal(metadata.annotations[0].selector, 'dynamic-list-view');
    end();
});
test('@component creates full selector if component suffix is absent from class name', ({ equal, end }) => {
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].selector, 'dynamic-list-view');
    end();
});
test('@component propagates template to metadata when it is the sole argument', ({ equal, end }) => {
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].template, template);
    end();
});
test('@component propagates template to metadata when it is the first of 2 arguments', ({ equal, end }) => {
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, {})
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].template, template);
    end();
});
test('@component propagates template to metadata when specified as the first argument of 3 arguments', ({ deepEqual, end }) => {
    const style = 'h1 { background:"aqua"; }';
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, { providers: [class {
                }] })
    ], DynamicListView);
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
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component('<div></div>', style)
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    deepEqual(metadata.annotations[0].styles, [style]);
    end();
});
test('@component propagates style to styles metadata when specified as the 2nd of 3 arguments', ({ deepEqual, end }) => {
    const style = 'h1 { background: "aqua"; }';
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, { providers: [class {
                }] })
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    deepEqual(metadata.annotations[0].styles, [style]);
    end();
});
test('@component propagates all options to metadata when options is the 2nd of 2 arguments', ({ deepEqual, end }) => {
    const componentOptions = createPopulatedComponentOptions();
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, componentOptions)
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    Object.keys(componentOptions).forEach((key) => {
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
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, componentOptions)
    ], DynamicListView);
    const metadata = extract_metadata_1.default(DynamicListView);
    Object.keys(componentOptions).forEach((key) => {
        console.info(key);
        const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
        deepEqual(componentOptions[key], target);
    });
    end();
});
function createPopulatedComponentOptions() {
    return {
        animations: [new core_1.AnimationEntryMetadata('a', [])],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        encapsulation: core_1.ViewEncapsulation.None,
        exportAs: 'anonymous',
        host: { 'app': 'src' },
        interpolation: ['x', 'y'],
        moduleId: 'somewhere',
        entryComponents: [class {
            }],
        providers: [{ provide: 'SomeService', useClass: class Provider {
                }, multi: false }, [{
                    provide: 'SomeServiceViaFactory', useFactory: (dep1) => dep1 + 2, deps: [1]
                }]],
        queries: { awake: 'always' },
        viewProviders: [class {
            }, [class {
                }]]
    };
}
