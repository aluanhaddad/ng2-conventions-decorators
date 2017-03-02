"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test = require("tape");
var core_1 = require("@angular/core");
var extract_metadata_1 = require("./helpers/extract-metadata");
var index_1 = require("../index");
test('@directive creates square-bracketed camelCased selector excluding "Directive" suffix', function (_a) {
    var equal = _a.equal, end = _a.end;
    var AutoSlideDirective = (function () {
        function AutoSlideDirective() {
            this.autoSlide = '';
        }
        return AutoSlideDirective;
    }());
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = tslib_1.__decorate([
        index_1.directive
    ], AutoSlideDirective);
    var selector = extract_metadata_1.default(AutoSlideDirective).annotations[0].selector;
    equal(selector, '[autoSlide]');
    end();
});
test('@directive creates square-bracketed if "Directive" suffix is not present in class name', function (_a) {
    var equal = _a.equal, end = _a.end;
    var AutoSlide = (function () {
        function AutoSlide() {
            this.autoSlide = '';
        }
        return AutoSlide;
    }());
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = tslib_1.__decorate([
        index_1.directive
    ], AutoSlide);
    var selector = extract_metadata_1.default(AutoSlide).annotations[0].selector;
    equal(selector, '[autoSlide]');
    end();
});
test('@directive exports as the camelCased class name excluding the "Directive" suffix', function (_a) {
    var equal = _a.equal, end = _a.end;
    var AutoSlideDirective = (function () {
        function AutoSlideDirective() {
            this.autoSlide = '';
        }
        return AutoSlideDirective;
    }());
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = tslib_1.__decorate([
        index_1.directive
    ], AutoSlideDirective);
    var _b = extract_metadata_1.default(AutoSlideDirective).annotations[0], selector = _b.selector, exportAs = _b.exportAs;
    equal(exportAs, 'autoSlide');
    equal(selector, '[autoSlide]');
    end();
});
test('@directive exports as the camelCased class name if "Directive" suffix is not present in class name', function (_a) {
    var equal = _a.equal, end = _a.end;
    var AutoSlide = (function () {
        function AutoSlide() {
            this.autoSlide = '';
        }
        return AutoSlide;
    }());
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = tslib_1.__decorate([
        index_1.directive
    ], AutoSlide);
    var _b = extract_metadata_1.default(AutoSlide).annotations[0], selector = _b.selector, exportAs = _b.exportAs;
    equal(exportAs, 'autoSlide');
    equal(selector, '[autoSlide]');
    end();
});
