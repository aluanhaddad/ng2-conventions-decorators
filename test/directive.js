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
    __decorate([
        index_1.input,
        __metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = __decorate([
        index_1.directive,
        __metadata("design:paramtypes", [])
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = __decorate([
        index_1.directive,
        __metadata("design:paramtypes", [])
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSlideDirective.prototype, "autoSlide", void 0);
    AutoSlideDirective = __decorate([
        index_1.directive,
        __metadata("design:paramtypes", [])
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSlide.prototype, "autoSlide", void 0);
    AutoSlide = __decorate([
        index_1.directive,
        __metadata("design:paramtypes", [])
    ], AutoSlide);
    var _b = extract_metadata_1.default(AutoSlide).annotations[0], selector = _b.selector, exportAs = _b.exportAs;
    equal(exportAs, 'autoSlide');
    equal(selector, '[autoSlide]');
    end();
});
//# sourceMappingURL=directive.js.map