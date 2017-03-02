"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test = require("tape");
var index_1 = require("../index");
var core_1 = require("@angular/core");
var extract_metadata_1 = require("./helpers/extract-metadata");
var template = '<div></div>';
test('@component creates kebab-cased selector excluding "Component" suffix', function (_a) {
    var equal = _a.equal, end = _a.end;
    var DynamicListViewComponent = (function () {
        function DynamicListViewComponent() {
        }
        return DynamicListViewComponent;
    }());
    DynamicListViewComponent = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListViewComponent);
    var metadata = extract_metadata_1.default(DynamicListViewComponent);
    equal(metadata.annotations[0].selector, 'dynamic-list-view');
    end();
});
test('@component creates full selector if component suffix is absent from class name', function (_a) {
    var equal = _a.equal, end = _a.end;
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].selector, 'dynamic-list-view');
    end();
});
test('@component propagates template to metadata when it is the sole argument', function (_a) {
    var equal = _a.equal, end = _a.end;
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template)
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].template, template);
    end();
});
test('@component propagates template to metadata when it is the first of 2 arguments', function (_a) {
    var equal = _a.equal, end = _a.end;
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, {})
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    equal(metadata.annotations[0].template, template);
    end();
});
test('@component propagates template to metadata when specified as the first argument of 3 arguments', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var style = 'h1 { background:"aqua"; }';
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, { providers: [(function () {
                    function class_1() {
                    }
                    return class_1;
                }())] })
    ], DynamicListView);
    var metadataKeys = Reflect.getMetadataKeys(DynamicListView);
    var metadata = metadataKeys.reduce(function (metadata, key) {
        metadata[key] = Reflect.getMetadata(key, DynamicListView);
        return metadata;
    }, {});
    deepEqual(metadata.annotations[0].template, template);
    end();
});
test('@component propagates style to styles metadata when specified as the 2nd of 2 arguments', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var style = 'h1 { background: "aqua"; }';
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component('<div></div>', style)
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    deepEqual(metadata.annotations[0].styles, [style]);
    end();
});
test('@component propagates style to styles metadata when specified as the 2nd of 3 arguments', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var style = 'h1 { background: "aqua"; }';
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, { providers: [(function () {
                    function class_2() {
                    }
                    return class_2;
                }())] })
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    deepEqual(metadata.annotations[0].styles, [style]);
    end();
});
test('@component propagates all options to metadata when options is the 2nd of 2 arguments', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var componentOptions = createPopulatedComponentOptions();
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, componentOptions)
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    Object.keys(componentOptions).forEach(function (key) {
        console.info(key);
        var target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0]["_" + key];
        deepEqual(componentOptions[key], target);
    });
    end();
});
test('@component propagates all options to metadata when options is the 3rd of 3 arguments', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var style = 'h1 { background:"aqua"; }';
    var template = '<div></div>';
    var componentOptions = createPopulatedComponentOptions();
    var DynamicListView = (function () {
        function DynamicListView() {
        }
        return DynamicListView;
    }());
    DynamicListView = tslib_1.__decorate([
        index_1.component(template, style, componentOptions)
    ], DynamicListView);
    var metadata = extract_metadata_1.default(DynamicListView);
    Object.keys(componentOptions).forEach(function (key) {
        console.info(key);
        var target = metadata.annotations[0][key] === 0 ? 0 : metadata.annotations[0][key] || metadata.annotations[0]["_" + key];
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
        host: { app: 'src' },
        interpolation: ['x', 'y'],
        moduleId: 'somewhere',
        entryComponents: [(function () {
                function class_3() {
                }
                return class_3;
            }())],
        providers: [{ provide: 'SomeService', useClass: (function () {
                    function Provider() {
                    }
                    return Provider;
                }()), multi: false }, [{
                    provide: 'SomeServiceViaFactory', useFactory: function (dep1) { return dep1 + 2; }, deps: [1]
                }]],
        queries: { awake: 'always' },
        viewProviders: [(function () {
                function class_4() {
                }
                return class_4;
            }()), [(function () {
                    function class_5() {
                    }
                    return class_5;
                }())]]
    };
}
