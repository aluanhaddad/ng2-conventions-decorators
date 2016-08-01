/**
 * @description The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import {
    Input,
    Output,
    Injectable,
    Component,
    Pipe,
    PipeTransform,
    ChangeDetectionStrategy,
    AnimationEntryMetadata,
    ViewEncapsulation,
    Type
} from '@angular/core';

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
export const input = <T>(target: T, propertyKey: string) => Input()(target, propertyKey);

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
export const injectable: InjectableClassDecorator = <TFunction extends new (x, ...args) => any>(target: TFunction) => Injectable()(target);

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
export const component: ConventionBasedComponentDecorator = (template: string, styleOrOptions?: string | ComponentOptions, options?: ComponentOptions) => {
    return <T extends { name: string; new (...args): any }>(target: T) => {

        const selector = snakeCase(target.name);

        const styles = typeof styleOrOptions === 'string' ? [styleOrOptions] : undefined;

        const componentOptions = (typeof styleOrOptions !== 'string' && styleOrOptions ||
            typeof styleOrOptions === 'string' && options || {}) as ComponentOptions & { template: string, styles: string[], selector: string };

        componentOptions.styles = styles;
        componentOptions.template = template;
        componentOptions.selector = selector;

        return Component(componentOptions)(target);
    };
};

function snakeCase(identifier: string): string {
    const nameSegments = identifier.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && nameSegments.indexOf('Component') === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(segment => segment.toLowerCase())
        .join('-');
}

export { PipeTransform }

export type Provide = {
    provide: Provider;
    multi: boolean;
}

export type ProvideUsingClass = {
    provide: any;
    useClass: new (...args: any[]) => any;
    multi?: boolean;
}
export type ProvideUsingExisting = {
    provide: any;
    useExisting: any;
    multi?: boolean;

}
export type ProvideUsingFactory = {
    provide: any;
    useFactory: (...args) => any;
    deps: any[];
    multi?: boolean;
};

export type Constructable = new (...args: any[]) => any;

/**
 * A semi-strongly typed provider see https://github.com/angular/angular/issues/9751 
 */
export type Provider =
    (
        ProvideUsingClass
        | Provide
        | ProvideUsingExisting
        | ProvideUsingFactory
        | Constructable)[]
    | Provide
    | ProvideUsingClass
    | ProvideUsingExisting
    | ProvideUsingFactory
    | Constructable;

/**
 * A semi-strongly typed array of providers see https://github.com/angular/angular/issues/9751 
 */
export type Providers = Provider[];

export interface ComponentOptions {
    properties?: string[];
    events?: string[];
    host?: {
        [key: string]: string;
    };
    providers?: Provider[];
    exportAs?: string;
    moduleId?: string;
    queries?: {
        [key: string]: any;
    };
    viewProviders?: Provider[];
    changeDetection?: ChangeDetectionStrategy;
    animations?: AnimationEntryMetadata[];
    directives?: (Type | any[])[];
    pipes?: ((new (...args) => PipeTransform) | any[])[];
    encapsulation?: ViewEncapsulation;
    interpolation?: [string, string];
    precompile?: (Type | any[])[];
}

export interface ConventionalComponentDecorator {
    <T extends new (...args) => any>(target: T): any;
}

export interface ConventionBasedComponentDecorator {
    (template: string, options?: ComponentOptions): ConventionalComponentDecorator;
    (template: string, style: string, options?: ComponentOptions): ConventionalComponentDecorator;
}

export type InjectableClassDecorator = <TFunction extends new (t: T1, ...args) => any, T1 extends { prototype }>(target: TFunction) => TFunction | void;