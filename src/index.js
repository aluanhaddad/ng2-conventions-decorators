"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module
 * @description
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
var core_1 = require("@angular/core");
var ensure_name_1 = require("./util/ensure-name");
var kebab_case_1 = require("./util/kebab-case");
var camel_case_1 = require("./util/camel-case");
/**
 * Simple Input decorator for common case where the property is not aliased.
 * ```typescript
 * @input binding = 1;
 * ```
 * is equivalent to
 * ```typescript
 * @Input() binding = 1;
 * ```
 */
exports.input = function (target, propertyKey) { return core_1.Input()(target, propertyKey); };
/**
 * Simple Output decorator for common case where the property is not aliased.
 * ```typescript
 * @output onChange = new EventEmitter<number>();
 * ```
 * is equivalent to
 * ```typescript
 * @Output() onChange = new EventEmitter<number>();
 * ```
 */
exports.output = function (target, propertyKey) { return core_1.Output()(target, propertyKey); };
/**
 * Simple dependency injection decorator with stronger type validation.
 * ```typescript
 * @injectable class MyService {
 *     constructor(otherServe: OtherService) { }
 * }
 * ```
 * is equivalent to
 * ```typescript
 * @Injectable() class MyService {
 *     constructor(otherServe: OtherService) { }
 * }
 * ```
 * Note that
 * ```typescript
 * @injectable class MyService { }
 * ```
 * is a type error because MyService does not have any dependencies.
 */
exports.injectable = function (target) { return core_1.Injectable()(target); };
/**
 * Simple Pipe decorator, enhances type safety.
 * The resulting pipe is pure.
 * Automatically uses style guide convention deriving pipe name from class name.
 * ```typescript
 * @pipe class StandardCurrencyPipe { transform(value); }
 * // is equivalent to
 * @Pipe({ name: 'standardCurrency' }) class StandardCurrencyPipe { transform(value); }
 * ```
 * Note that
 * ```typescript
 * @pipe class StandardCurrencyPipe { }
 * ```
 * is a type error because transform is required.
 */
exports.pipe = function (target) {
    var pascalName = target.name.split('Pipe')[0];
    var canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
    return core_1.Pipe({ name: canonicalName })(target);
};
/**
 * A convention based component decorator that creates a kebab-cased-element selector and enforces required parameters.
 * @param template The template string. Typically this would imported via a loader or bundler such as SystemJS or Webpack.
 * @param style The style string. Typically this would imported via a loader or bundler such as SystemJS or Webpack.
 * @param options additional component options.
 *
 * ```typescript
 * @component(template, style) export class SomeCustomElementComponent { ... }
 * // is equivalent to
 * @Component({
 *   template,
 *   styles: [style],
 *   selector: 'some-custom-element'
 * })
 * export class SomeCustomElementComponent { ... }
 * ```
 * ```typescript
 * @component(template) export class SomeCustomElementComponent { ... }
 * // is equivalent to
 * @Component({
 *   template,
 *   selector: 'some-custom-element'
 * }) export class SomeCustomElementComponent { ... }
 * ```
 */
exports.component = function (template, styleOrOptions, options) {
    return function (target) {
        ensure_name_1.default(target);
        var componentOptions = (typeof styleOrOptions !== 'string' && styleOrOptions ||
            typeof styleOrOptions === 'string' && options || {});
        componentOptions.selector = kebab_case_1.default(target.name, 'Component');
        componentOptions.styles = typeof styleOrOptions === 'string' && [styleOrOptions] || undefined;
        componentOptions.template = template;
        return core_1.Component(componentOptions)(target);
    };
};
/**
 * A convention based directive decorator that creates a Directive with an automatically, bracketed, camelCased `[myEnhancement]`
 * and is exported as `myEnhancement` for a class.
 * @param target the Directive class.
 */
exports.directive = function (target) {
    ensure_name_1.default(target);
    var camelCaseName = camel_case_1.default(target.name);
    var selector = "[" + camelCaseName + "]";
    return core_1.Directive({ selector: selector, exportAs: camelCaseName })(target);
};
/**
 * @deprecated this turned out not to be worth the trouble as, while slightly verbose,
 * instantiating a new EventEmitter is not poor encouraging low quality code.
 * Replace with import from core.
 */
exports.emitter = (function () {
    console.warn('emitter is deprecated. Use `new EventEmitter from `@angular/core`.');
    return new core_1.EventEmitter();
});
Object.defineProperties(exports.emitter, {
    sync: {
        value: function () { return new core_1.EventEmitter(false); }
    }
});
