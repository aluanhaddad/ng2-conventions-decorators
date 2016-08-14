"use strict";
/**
 * @description The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
const core_1 = require('@angular/core');
/**
 * Simple Input decorator for common case where property is not aliased.
 * ```typescript
 * @input binding = 1;
 * ```
 * is equivalent to
 * ```typescript
 * @Input() binding = 1;
 * ```
 */
exports.input = (target, propertyKey) => core_1.Input()(target, propertyKey);
/**
 * Simple Output decorator for common case where property is not aliased.
 * ```typescript
 * @output onChange = new EventEmitter<number>();
 * ```
 * is equivalent to
 * ```typescript
 * @Output() onChange = new EventEmitter<number>();
 * ```
 */
exports.output = (target, propertyKey) => core_1.Output()(target, propertyKey);
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
exports.injectable = (target) => core_1.Injectable()(target);
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
exports.pipe = (target) => {
    const pascalName = target.name.split('Pipe')[0];
    const canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
    return core_1.Pipe({ name: canonicalName })(target);
};
/**
 * Simple dependency injection decorator with stronger type validation.
 * ```typescript
 * @injectable class MyService {
 *     constructor(otherServe: OtherService) { }
 * }
 * // is equivalent to
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
exports.component = (template, styleOrOptions, options) => {
    return (target) => {
        const selector = snakeCase(target.name);
        const styles = typeof styleOrOptions === 'string' ? [styleOrOptions] : undefined;
        const componentOptions = (typeof styleOrOptions !== 'string' && styleOrOptions ||
            typeof styleOrOptions === 'string' && options || {});
        componentOptions.styles = styles;
        componentOptions.template = template;
        componentOptions.selector = selector;
        return core_1.Component(componentOptions)(target);
    };
};
function snakeCase(identifier) {
    const nameSegments = identifier.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && nameSegments.indexOf('Component') === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(segment => segment.toLowerCase())
        .join('-');
}
//# sourceMappingURL=index.js.map