/**
 * @module
 * @description
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import {
    Input,
    Output,
    EventEmitter,
    Injectable,
    Component,
    Directive,
    Pipe,
    Provider,
    PipeTransform,
    ChangeDetectionStrategy,
    AnimationEntryMetadata,
    ViewEncapsulation
} from '@angular/core';

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
export const input = <T>(target: T, propertyKey: string) => Input()(target, propertyKey);

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
export const output = <T>(target: T, propertyKey: string) => Output()(target, propertyKey);

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
export const injectable: InjectionDecorator = <TFunction extends new (x, ...args) => any>(target: TFunction) => Injectable()(target);

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
export const pipe = <T extends { name: string; new (...args): PipeTransform }>(target: T) => {
    const pascalName = target.name.split('Pipe')[0];
    const canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
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
export const component: ConventionBasedComponentDecorator = (template: string, styleOrOptions?: string | ComponentOptions, options?: ComponentOptions) => {
    return <T extends Manifest>(target: T) => {

        const componentOptions = (typeof styleOrOptions !== 'string' && styleOrOptions || typeof styleOrOptions === 'string' && options || {}) as ComponentOptions & { template: string, styles: string[], selector: string };

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
export const directive = <T extends Manifest>(target: T) => {
    const camelCaseName = camelCase(target.name);
    const selector = `[${camelCaseName}]`;
    return Directive({ selector, exportAs: camelCaseName })(target);
};

export { PipeTransform }

export interface ComponentOptions {
    host?: {
        [key: string]: string;
    };
    providers?: Provider[];
    viewProviders?: Provider[];
    exportAs?: string;
    moduleId?: string;
    queries?: {
        [key: string]: any;
    };
    changeDetection?: ChangeDetectionStrategy;
    animations?: AnimationEntryMetadata[];
    encapsulation?: ViewEncapsulation;
    interpolation?: [string, string];
    entryComponents?: (Function | any[])[];
}

/**
 * The type of a decorator returned by the an invocation `component` decorator factory.
 */
export interface ConventionalComponentDecorator {
    /**
     * @parm target The class to decorate.
     */
    <T extends Manifest>(target: T);
}

/**
 * A convention based component decorator that creates a kebab-cased-element selector and enforces required parameters.
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
export interface ConventionBasedComponentDecorator {
    /**
     * @param template The template string. Typically this would imported via a loader or bundler such as SystemJS or Webpack.
     * @param options additional component options.
     */
    (template: string, options?: ComponentOptions): ConventionalComponentDecorator;
    /**
     * @param template The template string. Typically this would imported via a loader or bundler such as SystemJS or Webpack.
     * @param style The style string. Typically this would imported via a loader or bundler such as SystemJS or Webpack.
     * @param options additional component options.
     */
    (template: string, style: string, options?: ComponentOptions): ConventionalComponentDecorator;
}
/**
 * Simple dependency injection decorator with stronger type validation.
 */
export interface InjectionDecorator {
    /** @param target The class to decorate.*/
    <TFunction extends new (x, ...args) => any>(target: TFunction): TFunction | void;
}

/**
 * An alias for a Function with a [[Construct]] internal slot.
 */
export type Manifest = { new (...args), name: string };
/**
 * A convenience function which creates a new EventEmitter which emits events of the specified type.
 * ```typescript
 * @output propertyChange = emitter<{ name; value }>();
 * ```
 */
export const emitter = (<T>() => new EventEmitter<T>()) as {
    readonly sync: <T>() => EventEmitter<T>
} & (<T>() => EventEmitter<T>);
Object.defineProperties(emitter, {
    sync: {
        value: <T>() => new EventEmitter<T>(false)
    }
});

const stripSuffix = (suffix: string) => (value: string) => {
    const location = value.lastIndexOf(suffix);
    return location > 0 ? value.substr(0, value.length - suffix.length) : value;
};

function camelCase(identifier: string): string {
    const selector = stripSuffix('Directive')(identifier.substr(1));
    return `${identifier[0].toLowerCase()}${selector}`;
}

function kebabCase(identifier: string, suffixToStrip?: string): string {
    const name = suffixToStrip ? stripSuffix(suffixToStrip)(identifier) : identifier;
    const nameSegments = name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && suffixToStrip && nameSegments.indexOf(suffixToStrip) === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(segment => segment.toLowerCase())
        .join('-');
}