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
test('Class metadata must be equivalent', tape => {
    const { ConventionDecorated, Decorated } = createClasses();
    const firstKeys = Reflect.getMetadataKeys(ConventionDecorated);
    const secondKeys = Reflect.getMetadataKeys(Decorated);
    const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, ConventionDecorated));
    const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, Decorated));
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance metadata must be equivalent', tape => {
    const { ConventionDecorated, Decorated } = createClasses();
    const decorated1 = new ConventionDecorated();
    const decorated2 = new Decorated();
    const firstKeys = Reflect.getMetadataKeys(decorated1, 'dateAndTime');
    const secondKeys = Reflect.getMetadataKeys(decorated2, 'dateAndTime');
    const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, decorated1, 'dateAndTime'));
    const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, decorated2, 'dateAndTime'));
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class setter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance getter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithGetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class setter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Instance setter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithSetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class getter and setter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithGettersAndSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
test('Class getter and setter metadata must be equivalent', tape => {
    const { Conventional, Standard } = createClassesWithGettersAndSetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    tape.deepEqual(firstMetadata, secondMetadata);
    tape.end();
});
function createClasses() {
    class ConventionDecorated {
    }
    __decorate([
        index_1.input, 
        __metadata('design:type', Date)
    ], ConventionDecorated.prototype, "dateAndTime", void 0);
    ;
    class Decorated {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], Decorated.prototype, "dateAndTime", void 0);
    ;
    return { ConventionDecorated, Decorated };
}
function createClassesWithSetters() {
    class Conventional {
        set dateAndTime(value) {
            this.date = value;
        }
    }
    __decorate([
        index_1.input, 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Conventional.prototype, "dateAndTime", null);
    ;
    class Standard {
        set dateAndTime(value) {
            this.date = value;
        }
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional, Standard };
}
function createClassesWithGetters() {
    const now = new Date();
    class Conventional {
        get dateAndTime() {
            return now;
        }
    }
    __decorate([
        index_1.input, 
        __metadata('design:type', Date)
    ], Conventional.prototype, "dateAndTime", null);
    ;
    class Standard {
        get dateAndTime() {
            return now;
        }
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional, Standard };
}
function createClassesWithGettersAndSetters() {
    class Conventional {
        get dateAndTime() {
            return this.date;
        }
        set dateAndTime(value) {
            this.date = value;
        }
    }
    __decorate([
        index_1.input, 
        __metadata('design:type', Date)
    ], Conventional.prototype, "dateAndTime", null);
    ;
    class Standard {
        get dateAndTime() {
            return this.date;
        }
        set dateAndTime(value) {
            this.date = value;
        }
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional, Standard };
}
//# sourceMappingURL=input.js.map