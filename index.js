"use strict";
/**
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
var core_1 = require('@angular/core');
var inputDecorator = function (target, propertyKey) { return core_1.Input()(target, propertyKey); };
var outputDecorator = function (target, propertyKey) { return core_1.Output()(target, propertyKey); };
var injectableDecorator = function (target) { return core_1.Injectable()(target); };
var pipeDecorator = function (target) {
    var pascalName = target.name.split('Pipe')[0];
    var canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
    return core_1.Pipe({ name: canonicalName })(target);
};
var componentDecorator = function (template, styleOrOptions) { return function (target) {
    var nameSegments = target.name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && nameSegments.indexOf('Component') === nameSegments.length - 1) {
        nameSegments.pop();
    }
    var snakeCasedSelector = nameSegments
        .map(function (segment) { return segment.toLowerCase(); })
        .join('-');
    var options;
    if (typeof styleOrOptions === 'string') {
        options = { styles: [styleOrOptions], selector: snakeCasedSelector, template: template };
    }
    else {
        options = styleOrOptions || {};
        options.styles = options.styles || [];
        options.template = template;
        options.selector = snakeCasedSelector;
    }
    return core_1.Component(options)(target);
}; };
/**
 * Simple Input decorator for commonon case where property is not aliased.
 * ```typescript
 * @input binding = 1;
 * // is equivalent to
 * @Input() binding = 1;
 * ```
 */
exports.input = inputDecorator;
/**
 * Simple Output decorator for commonon case where property is not aliased.
 * ```typescript
 * @output onChange = new EventEmitter<number>();
 * // is equivalent to
 * @Output() onChange = new EventEmitter<number>();
 * ```
 */
exports.output = outputDecorator;
/**
 * Simple Injectable decorator.
 * ```typescript
 * @injectable class MyService { }
 * // is equivalent to
 * @Injectable() class MyService { }
 * ```
 */
exports.injectable = injectableDecorator;
/**
 * Simple Pipe decorator, enhances type safety.
 * The resulting pipe is pure.
 * Automatically uses style guide convention deriving pipe name from class name.
 * ```typescript
 * @pipe class StandardCurrencyPipe { }
 * // is equivalent to
 * @Pipe({ name: 'standardCurrency' }) class StandardCurrencyPipe { }
 * ```
 */
exports.pipe = pipeDecorator;
/**
 * Simple Component decorator resulting in a snake-cased-element tag by default.
 * ```typescript
 * @component(template, style)
 * export class SomeCustomElementComponent { ... }
 * // is equivalent to
 * @Component({
 *   template,
 *   styles: [style],
 *   selector: 'some-custom-element'
 * })
 * export class SomeCustomElementComponent { ... }
 * ```
 */
exports.component = componentDecorator;
//# sourceMappingURL=index.js.map