"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('reflect-metadata');
const test = require('tape');
const index_1 = require('../index');
const core_1 = require('@angular/core');
// test('@component must creates snake cased selector excluding component keyword', tape => {
//     @component('<div></div>') class DynamicListViewComponent { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListViewComponent);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListViewComponent);
//         return metadata;
//     }, {});
//     tape.equal(metadata.annotations[0].selector, 'dynamic-list-view');
//     tape.end();
// });
// test('@component creates full selector if component suffix is absent from class name', tape => {
//     @component('<div></div>') class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.equal(metadata.annotations[0].selector, 'dynamic-list-view');
//     tape.end();
// });
// test('@component propagates template to metadata when it is the sole argument', tape => {
//     const template = '<div></div>';
//     @component(template) class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.equal(metadata.annotations[0].template, template);
//     tape.end();
// });
// test('@component propagates template to metadata when it is the first of 2 arguments', tape => {
//     const template = '<div></div>';
//     @component(template, {}) class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.equal(metadata.annotations[0].template, template);
//     tape.end();
// });
// test('@component propagates template to metadata when specified as the first argument of 3 arguments', tape => {
//     const template = '<div></div>';
//     @component(template, 'h1 { background:"aqua"; }', { directives: [class { }] }) class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.deepEqual(metadata.annotations[0].template, template);
//     tape.end();
// });
// test('@component propagates style to styles metadata when specified as the 2nd of 2 arguments', tape => {
//     const style = 'h1 { background:"aqua"; }';
//     @component('<div></div>', style) class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.deepEqual(metadata.annotations[0].styles, [style]);
//     tape.end();
// });
// test('@component propagates style to styles metadata when specified as the 2nd of 3 arguments', tape => {
//     const style = 'h1 { background:"aqua"; }';
//     const template = '<div></div>';
//     @component(template, style, { directives: [class { }] }) class DynamicListView { }
//     const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
//     const metadata = metadataKeys.reduce((metadata, key) => {
//         metadata[key] = Reflect.getMetadata(key, DynamicListView);
//         return metadata;
//     }, {});
//     tape.deepEqual(metadata.annotations[0].styles, [style]);
//     tape.end();
// });
test('@component propagates all options to metadata when options is the 2nd of 2 arguments', tape => {
    const template = '<div></div>';
    const componentOptions = createPopulatedComponentOptions();
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = __decorate([
        index_1.component(template, componentOptions), 
        __metadata('design:paramtypes', [])
    ], DynamicListView);
    const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, DynamicListView);
        return metadata;
    }, {});
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
    let DynamicListView = class DynamicListView {
    };
    DynamicListView = __decorate([
        index_1.component(template, style, componentOptions), 
        __metadata('design:paramtypes', [])
    ], DynamicListView);
    const metadataKeys = Reflect.getMetadataKeys(DynamicListView);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, DynamicListView);
        return metadata;
    }, {});
    Object.keys(componentOptions).forEach((key, index) => {
        console.info(key);
        const target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0][`_${key}`];
        tape.deepEqual(componentOptions[key], target);
    });
    tape.end();
});
function createPopulatedComponentOptions() {
    return {
        animations: [new core_1.AnimationEntryMetadata('a', [])],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        directives: [class {
            }
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        events: ['click'],
        exportAs: 'anonymous',
        host: { 'app': 'src' },
        interpolation: ['x', 'y'],
        moduleId: 'somewhere',
        pipes: [class {
                transform(value) { return value; }
            }
        ],
        precompile: [class {
            }
        ],
        properties: ['abc', '123'],
        providers: [{ provide: 'SomeService', useClass: class Provider {
                }
                , multi: false }, [{
                    provide: 'SomeServiceViaFactory', useFactory: (dep1) => dep1 + 2, deps: [1]
                }]],
        queries: { awake: 'always' },
        viewProviders: [class {
            }
            , [class {
                }
            ]]
    };
}
//# sourceMappingURL=component.js.map