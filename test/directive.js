"use strict";
const tslib_1 = require("tslib");
require("reflect-metadata");
const test = require("tape");
const core_1 = require("@angular/core");
const extract_metadata_1 = require("./helpers/extract-metadata");
const index_1 = require("../index");
test('@directive creates square-bracketed camelCased selector excluding "Directive" suffix', ({ equal, end }) => {
    let AutoSlideDirective = class AutoSlideDirective {
        constructor() {
            this.autoSlide = '';
        }
    };
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = tslib_1.__decorate([
        index_1.directive,
        tslib_1.__metadata("design:paramtypes", [])
    ], AutoSlideDirective);
    const { annotations: [{ selector }] } = extract_metadata_1.default(AutoSlideDirective);
    equal(selector, '[autoSlide]');
    end();
});
test('@directive creates square-bracketed if "Directive" suffix is not present in class name', ({ equal, end }) => {
    let AutoSlide = class AutoSlide {
        constructor() {
            this.autoSlide = '';
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = tslib_1.__decorate([
        index_1.directive,
        tslib_1.__metadata("design:paramtypes", [])
    ], AutoSlide);
    const { annotations: [{ selector }] } = extract_metadata_1.default(AutoSlide);
    equal(selector, '[autoSlide]');
    end();
});
test('@directive exports as the camelCased class name excluding the "Directive" suffix', ({ equal, end }) => {
    let AutoSlideDirective = class AutoSlideDirective {
        constructor() {
            this.autoSlide = '';
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = tslib_1.__decorate([
        index_1.directive,
        tslib_1.__metadata("design:paramtypes", [])
    ], AutoSlideDirective);
    const { annotations: [{ selector, exportAs }] } = extract_metadata_1.default(AutoSlideDirective);
    equal(exportAs, 'autoSlide');
    equal(selector, '[autoSlide]');
    end();
});
test('@directive exports as the camelCased class name if "Directive" suffix is not present in class name', ({ equal, end }) => {
    let AutoSlide = class AutoSlide {
        constructor() {
            this.autoSlide = '';
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = tslib_1.__decorate([
        index_1.directive,
        tslib_1.__metadata("design:paramtypes", [])
    ], AutoSlide);
    const { annotations: [{ selector, exportAs }] } = extract_metadata_1.default(AutoSlide);
    equal(exportAs, 'autoSlide');
    equal(selector, '[autoSlide]');
    end();
});
