/**
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import { PipeTransform, ChangeDetectionStrategy, AnimationEntryMetadata, ViewEncapsulation, Type } from '@angular/core';
export { PipeTransform };
export interface ComponentOptions {
    selector?: string;
    inputs?: string[];
    outputs?: string[];
    properties?: string[];
    events?: string[];
    host?: {
        [key: string]: string;
    };
    providers?: any[];
    exportAs?: string;
    moduleId?: string;
    queries?: {
        [key: string]: any;
    };
    viewProviders?: any[];
    changeDetection?: ChangeDetectionStrategy;
    templateUrl?: string;
    template?: string;
    styleUrls?: string[];
    styles?: string[];
    animations?: AnimationEntryMetadata[];
    directives?: (Type | any[])[];
    pipes?: (Type | any[])[];
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
/**
 * Simple Input decorator for commonon case where property is not aliased.
 * ```typescript
 * @input binding = 1;
 * // is equivalent to
 * @Input() binding = 1;
 * ```
 */
export declare const input: <T>(target: T, propertyKey: string) => any;
/**
 * Simple Output decorator for commonon case where property is not aliased.
 * ```typescript
 * @output onChange = new EventEmitter<number>();
 * // is equivalent to
 * @Output() onChange = new EventEmitter<number>();
 * ```
 */
export declare const output: <T>(target: T, propertyKey: string) => any;
/**
 * Simple Injectable decorator.
 * ```typescript
 * @injectable class MyService { }
 * // is equivalent to
 * @Injectable() class MyService { }
 * ```
 */
export declare const injectable: <TFunction extends Function>(target: TFunction) => TFunction | void;
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
export declare const pipe: <T extends {
    new (...args: any[]): PipeTransform;
    name: string;
}>(target: T) => any;
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
export declare const component: ConventionBasedComponentDecorator;
