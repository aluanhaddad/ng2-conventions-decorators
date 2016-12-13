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
var index_1 = require("../index");
var core_1 = require("@angular/core");
test('Class metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClasses(), ConventionDecorated = _b.ConventionDecorated, Decorated = _b.Decorated;
    var firstKeys = Reflect.getMetadataKeys(ConventionDecorated);
    var secondKeys = Reflect.getMetadataKeys(Decorated);
    var firstMetadata = firstKeys.map(function (key) { return Reflect.getMetadata(key, ConventionDecorated); });
    var secondMetadata = secondKeys.map(function (key) { return Reflect.getMetadata(key, Decorated); });
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClasses(), ConventionDecorated = _b.ConventionDecorated, Decorated = _b.Decorated;
    var decorated1 = new ConventionDecorated();
    var decorated2 = new Decorated();
    var firstKeys = Reflect.getMetadataKeys(decorated1, 'dateAndTime');
    var secondKeys = Reflect.getMetadataKeys(decorated2, 'dateAndTime');
    var firstMetadata = firstKeys.map(function (key) { return Reflect.getMetadata(key, decorated1, 'dateAndTime'); });
    var secondMetadata = secondKeys.map(function (key) { return Reflect.getMetadata(key, decorated2, 'dateAndTime'); });
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class setter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithSetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance getter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithGetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class setter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithSetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance setter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithSetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithGettersAndSetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithGettersAndSetters(), Conventional = _b.Conventional, Standard = _b.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent when decoration is on setter', function (_a) {
    var deepEqual = _a.deepEqual, end = _a.end;
    var _b = createClassesWithGettersAndSettersWithDecoratorOnSet(), Conventional = _b.Conventional, Standard = _b.Standard;
    var decorated1 = new Conventional();
    var decorated2 = new Standard();
    var firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    var secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
function createClasses() {
    var ConventionDecorated = (function () {
        function ConventionDecorated() {
        }
        return ConventionDecorated;
    }());
    __decorate([
        index_1.input,
        __metadata("design:type", Date)
    ], ConventionDecorated.prototype, "dateAndTime", void 0);
    ;
    var Decorated = (function () {
        function Decorated() {
        }
        return Decorated;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], Decorated.prototype, "dateAndTime", void 0);
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
        return Conventional;
    }());
    __decorate([
        index_1.input,
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], Conventional.prototype, "dateAndTime", null);
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
        return Standard;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], Standard.prototype, "dateAndTime", null);
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
        return Conventional;
    }());
    __decorate([
        index_1.input,
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [])
    ], Conventional.prototype, "dateAndTime", null);
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
        return Standard;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [])
    ], Standard.prototype, "dateAndTime", null);
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
        return Conventional;
    }());
    __decorate([
        index_1.input,
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [])
    ], Conventional.prototype, "dateAndTime", null);
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
        return Standard;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [])
    ], Standard.prototype, "dateAndTime", null);
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
        return Conventional;
    }());
    __decorate([
        index_1.input,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Conventional.prototype, "dateAndTime", null);
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
        return Standard;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional: Conventional, Standard: Standard };
}
//# sourceMappingURL=input.js.map