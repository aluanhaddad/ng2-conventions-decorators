/**
 * @module
 * @description
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import { EventEmitter, Provider, PipeTransform, ChangeDetectionStrategy, AnimationEntryMetadata, ViewEncapsulation } from '@angular/core';
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
export declare const input: <T>(target: T, propertyKey: string) => any;
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
export declare const output: <T>(target: T, propertyKey: string) => any;
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
export declare const injectable: InjectionDecorator;
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
export declare const pipe: <T extends {
  new (...args: any[]): PipeTransform;
  name: string;
}>(target: T) => T;
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
export declare const component: ConventionBasedComponentDecorator;
/**
 * A convention based directive decorator that creates a Directive with an automatically, bracketed, camelCased `[myEnhancement]`
 * and is exported as `myEnhancement` for a class.
 * @param target the Directive class.
 */
export declare const directive: <T extends Manifest>(target: T) => T;
export { PipeTransform };
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
  <T extends Manifest, Instance>(target: T & (new (...args: any[]) => {
    [P in keyof Instance]: Instance[P];
  })): any;
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
export declare type Manifest = {
  new (...args);
  name: string;
};
/**
 * A convenience function which creates a new EventEmitter which emits events of the specified type.
 * ```typescript
 * @output propertyChange = emitter<{ name; value }>();
 * ```
 */
export declare const emitter: {
  readonly sync: <T>() => EventEmitter<T>;
} & (<T>() => EventEmitter<T>);
