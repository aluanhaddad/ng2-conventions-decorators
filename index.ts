/**
 * The decorators exposed by this module serve as convention driven
 * wrappers for various decorator _factories_ exported from @angular/core.
 * They enforce, by convention, naming guidelines for _Components_, _Input_ and _Output_ properties, and _Pipes_.
 * Some additionally provide stronger type checking, catching invalid decorator use at compile time via _type constraints_.
 */
import {
    Input,
    Output,
    Injectable,
    Component,
    ComponentDecorator,
    ComponentMetadata,
    Pipe,
    PipeTransform,
    ChangeDetectionStrategy,
    AnimationEntryMetadata,
    ViewEncapsulation,
    Type
} from '@angular/core';


const inputDecorator = <T>(target: T, propertyKey: string) => Input()(target, propertyKey);


const outputDecorator = <T>(target: T, propertyKey: string) => Output()(target, propertyKey);


const injectableDecorator: ClassDecorator = <TFunction extends new () => any>(target: TFunction) => Injectable()(target);

const pipeDecorator = <T extends { name: string; new (...args): PipeTransform }>(target: T) => {
    const pascalName = target.name.split('Pipe')[0];
    const canonicalName = pascalName[0].toLowerCase() + pascalName.substr(1);
    return Pipe({ name: canonicalName })(target);
};

const componentDecorator: ConventionBasedComponentDecorator = (template: string, styleOrOptions?: string | ComponentOptions) => <T extends { name: string; new (...args): any }>(target: T) => {
    const nameSegments = target.name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && nameSegments.indexOf('Component') === nameSegments.length - 1) {
        nameSegments.pop();
    }
    const snakeCasedSelector = nameSegments
        .map(segment => segment.toLowerCase())
        .join('-');
    let options: ComponentOptions;

    if (typeof styleOrOptions === 'string') {
        options = { styles: [styleOrOptions], selector: snakeCasedSelector, template };
    } else {
        options = styleOrOptions || {};
        options.styles = options.styles || [];
        options.template = template;
        options.selector = snakeCasedSelector;
    }
    return Component(options)(target);
};

export { PipeTransform }

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
export const input = inputDecorator;

/**
 * Simple Output decorator for commonon case where property is not aliased.
 * ```typescript
 * @output onChange = new EventEmitter<number>(); 
 * // is equivalent to 
 * @Output() onChange = new EventEmitter<number>();
 * ```
 */
export const output = outputDecorator;

/**
 * Simple Injectable decorator.
 * ```typescript
 * @injectable class MyService { } 
 * // is equivalent to 
 * @Injectable() class MyService { }
 * ```
 */
export const injectable = injectableDecorator;

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
export const pipe = pipeDecorator;

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
export const component = componentDecorator;