"use strict";
const tslib_1 = require("tslib");
require("reflect-metadata");
const test = require("tape");
const index_1 = require("../index");
const core_1 = require("@angular/core");
test('Class metadata must be equivalent', ({ deepEqual, end }) => {
    const { ConventionDecorated, Decorated } = createClasses();
    const firstKeys = Reflect.getMetadataKeys(ConventionDecorated);
    const secondKeys = Reflect.getMetadataKeys(Decorated);
    const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, ConventionDecorated));
    const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, Decorated));
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance metadata must be equivalent', ({ deepEqual, end }) => {
    const { ConventionDecorated, Decorated } = createClasses();
    const decorated1 = new ConventionDecorated();
    const decorated2 = new Decorated();
    const firstKeys = Reflect.getMetadataKeys(decorated1, 'dateAndTime');
    const secondKeys = Reflect.getMetadataKeys(decorated2, 'dateAndTime');
    const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, decorated1, 'dateAndTime'));
    const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, decorated2, 'dateAndTime'));
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class setter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance getter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithGetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class setter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Instance setter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithSetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithGettersAndSetters();
    const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithGettersAndSetters();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
test('Class getter and setter metadata must be equivalent when decoration is on setter', ({ deepEqual, end }) => {
    const { Conventional, Standard } = createClassesWithGettersAndSettersWithDecoratorOnSet();
    const decorated1 = new Conventional();
    const decorated2 = new Standard();
    const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
    const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');
    deepEqual(firstMetadata, secondMetadata);
    end();
});
function createClasses() {
    class ConventionDecorated {
    }
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Date)
    ], ConventionDecorated.prototype, "dateAndTime", void 0);
    ;
    class Decorated {
    }
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Date)
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
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [Date])
    ], Conventional.prototype, "dateAndTime", null);
    ;
    class Standard {
        set dateAndTime(value) {
            this.date = value;
        }
    }
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [Date])
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
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [])
    ], Conventional.prototype, "dateAndTime", null);
    ;
    class Standard {
        get dateAndTime() {
            return now;
        }
    }
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [])
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
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [])
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
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Date),
        tslib_1.__metadata("design:paramtypes", [])
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional, Standard };
}
function createClassesWithGettersAndSettersWithDecoratorOnSet() {
    class Conventional {
        get dateAndTime() {
            return this.date;
        }
        set dateAndTime(value) {
            this.date = value;
        }
    }
    tslib_1.__decorate([
        index_1.input,
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
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
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], Standard.prototype, "dateAndTime", null);
    ;
    return { Conventional, Standard };
}
