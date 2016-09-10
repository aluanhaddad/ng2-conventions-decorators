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
var test = require('tape');
var index_1 = require('../index');
var core_1 = require('@angular/core');
test('Class metadata must be equivalent', function (tape) {
    var _a = createClasses(), ConventionDecorated = _a.ConventionDecorated, Decorated = _a.Decorated;
    var firstKeys = Reflect.getMetadataKeys(ConventionDecorated);
    var secondKeys = Reflect.getMetadataKeys(Decorated);
    var firstMetadata = firstKeys.map(function (key) { return Reflect.getMetadata(key, ConventionDecorated); });
    var secondMetadata = secondKeys.map(function (key) { return Reflect.getMetadata(key, Decorated); });
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance metadata must be equivalent', function (tape) {
    var _a = createClasses(), ConventionDecorated = _a.ConventionDecorated, Decorated = _a.Decorated;
    var decorated1 = new ConventionDecorated();
    var decorated2 = new Decorated();
    var firstKeys = Reflect.getMetadataKeys(decorated1, 'dateAndTime');
    var secondKeys = Reflect.getMetadataKeys(decorated2, 'dateAndTime');
    var firstMetadata = firstKeys.map(function (key) { return Reflect.getMetadata(key, decorated1, 'dateAndTime'); });
    var secondMetadata = secondKeys.map(function (key) { return Reflect.getMetadata(key, decorated2, 'dateAndTime'); });
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class setter metadata must be equivalent', function (tape) {
    var _a = createClassesWithSetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance getter metadata must be equivalent', function (tape) {
    var _a = createClassesWithGetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class setter metadata must be equivalent', function (tape) {
    var _a = createClassesWithSetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance setter metadata must be equivalent', function (tape) {
    var _a = createClassesWithSetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class getter and setter metadata must be equivalent', function (tape) {
    var _a = createClassesWithGettersAndSetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class getter and setter metadata must be equivalent', function (tape) {
    var _a = createClassesWithGettersAndSetters(), Conventional = _a.Conventional, Standard = _a.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class getter and setter metadata must be equivalent when decoration is on setter', function (tape) {
    var _a = createClassesWithGettersAndSettersWithDecoratorOnSet(), Conventional = _a.Conventional, Standard = _a.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
function createClasses() {
    var ConventionDecorated = (function () {
        function ConventionDecorated() {
        }
        __decorate([
            index_1.input, 
            __metadata('design:type', Date)
        ], ConventionDecorated.prototype, "dateAndTime", void 0);
        return ConventionDecorated;
    }());
    ;
    var Decorated = (function () {
        function Decorated() {
        }
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Date)
        ], Decorated.prototype, "dateAndTime", void 0);
        return Decorated;
    }());
    ;
    return { ConventionDecorated: ConventionDecorated, Decorated: Decorated };
}
function createClassesWithSetters() {
    var Conventional = (function () {
        function Conventional() {
        }
        Object.defineProperty(Conventional.prototype, "dateAndTime", {
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            index_1.input, 
            __metadata('design:type', Object), 
            __metadata('design:paramtypes', [Object])
        ], Conventional.prototype, "dateAndTime", null);
        return Conventional;
    }());
    ;
    var Standard = (function () {
        function Standard() {
        }
        Object.defineProperty(Standard.prototype, "dateAndTime", {
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object), 
            __metadata('design:paramtypes', [Object])
        ], Standard.prototype, "dateAndTime", null);
        return Standard;
    }());
    ;
    return { Conventional: Conventional, Standard: Standard };
}
function createClassesWithGetters() {
    var now = new Date();
    var Conventional = (function () {
        function Conventional() {
        }
        Object.defineProperty(Conventional.prototype, "dateAndTime", {
            get: function () {
                return now;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            index_1.input, 
            __metadata('design:type', Date)
        ], Conventional.prototype, "dateAndTime", null);
        return Conventional;
    }());
    ;
    var Standard = (function () {
        function Standard() {
        }
        Object.defineProperty(Standard.prototype, "dateAndTime", {
            get: function () {
                return now;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Date)
        ], Standard.prototype, "dateAndTime", null);
        return Standard;
    }());
    ;
    return { Conventional: Conventional, Standard: Standard };
}
function createClassesWithGettersAndSetters() {
    var Conventional = (function () {
        function Conventional() {
        }
        Object.defineProperty(Conventional.prototype, "dateAndTime", {
            get: function () {
                return this.date;
            },
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            index_1.input, 
            __metadata('design:type', Date)
        ], Conventional.prototype, "dateAndTime", null);
        return Conventional;
    }());
    ;
    var Standard = (function () {
        function Standard() {
        }
        Object.defineProperty(Standard.prototype, "dateAndTime", {
            get: function () {
                return this.date;
            },
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Date)
        ], Standard.prototype, "dateAndTime", null);
        return Standard;
    }());
    ;
    return { Conventional: Conventional, Standard: Standard };
}
function createClassesWithGettersAndSettersWithDecoratorOnSet() {
    var Conventional = (function () {
        function Conventional() {
        }
        Object.defineProperty(Conventional.prototype, "dateAndTime", {
            get: function () {
                return this.date;
            },
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            index_1.input, 
            __metadata('design:type', Date)
        ], Conventional.prototype, "dateAndTime", null);
        return Conventional;
    }());
    ;
    var Standard = (function () {
        function Standard() {
        }
        Object.defineProperty(Standard.prototype, "dateAndTime", {
            get: function () {
                return this.date;
            },
            set: function (value) {
                this.date = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Date)
        ], Standard.prototype, "dateAndTime", null);
        return Standard;
    }());
    ;
    return { Conventional: Conventional, Standard: Standard };
}
//# sourceMappingURL=input.js.map