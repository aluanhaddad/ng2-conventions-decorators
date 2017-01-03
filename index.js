/**
 * @module
 * @description
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import { Input, Output, EventEmitter, Injectable, Component, Directive, Pipe } from '@angular/core';
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
export var input = function (target, propertyKey) { return Input()(target, propertyKey); };
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
export var output = function (target, propertyKey) { return Output()(target, propertyKey); };
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
export var injectable = function (target) { return Injectable()(target); };
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
export var pipe = function (target) {
    var pascalName = target.name.split('Pipe')[0];
    var canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
    return Pipe({ name: canonicalName })(target);
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
export var component = function (template, styleOrOptions, options) {
    return function (target) {
        var componentOptions = (typeof styleOrOptions !== 'string' && styleOrOptions || typeof styleOrOptions === 'string' && options || {});
        componentOptions.selector = kebabCase(target.name, 'Component');
        componentOptions.styles = typeof styleOrOptions === 'string' ? [styleOrOptions] : undefined;
        componentOptions.template = template;
        return Component(componentOptions)(target);
    };
};
/**
 * A convention based directive decorator that creates a Directive with an automatically, bracketed, camelCased `[myEnhancement]`
 * and is exported as `myEnhancement` for a class.
 * @param target the Directive class.
 */
export var directive = function (target) {
    var camelCaseName = camelCase(target.name);
    var selector = "[" + camelCaseName + "]";
    return Directive({ selector: selector, exportAs: camelCaseName })(target);
};
/**
 * A convenience function which creates a new EventEmitter which emits events of the specified type.
 * ```typescript
 * @output propertyChange = emitter<{ name; value }>();
 * ```
 */
export var emitter = (function () { return new EventEmitter(); });
Object.defineProperties(emitter, {
    sync: {
        value: function () { return new EventEmitter(false); }
    }
});
var stripSuffix = function (suffix) { return function (value) {
    var location = value.lastIndexOf(suffix);
    return location > 0 ? value.substr(0, value.length - suffix.length) : value;
}; };
function camelCase(identifier) {
    var selector = stripSuffix('Directive')(identifier.substr(1));
    return "" + identifier[0].toLowerCase() + selector;
}
function kebabCase(identifier, suffixToStrip) {
    var name = suffixToStrip ? stripSuffix(suffixToStrip)(identifier) : identifier;
    var nameSegments = name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && suffixToStrip && nameSegments.indexOf(suffixToStrip) === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(function (segment) { return segment.toLowerCase(); })
        .join('-');
}
//# sourceMappingURL=index.js.map