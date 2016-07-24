# ng2-conventions-decorators

A set of minimal decorators for Angular2 that leverage established conventions to reduce boilerplate, enforce consistent APIs, and leverage static type analysis.

#API

# @pipe (_decorator_)
## _What?_ 
A simple, and typechecked pipe decorator
## _How?_ 
Use it just like `@Pipe()` except without the parenthesis and the redundant configuration object

```TypeScript
@pipe export class LocalCurrencyPipe {
    transform(value: string) { ... }
}
```
is precicely equivalent to
```TypeScript
@Pipe({ name: 'localCurrency' }) export class LocalCurrencyPipe {
    transform(value: string) { ... }
}
```
_Furthermore_
```TypeScript
@pipe export class LocalCurrencyPipe {
    // forgot to implement transform
 }
```
is a TypeScript compile error while 
```TypeScript
@Pipe({ name: 'localCurrency' }) export class LocalCurrencyPipe { 
    // forgot to implement transform
}
```
will fail at runtime.
## _Why?_
1. DRY
1. Automatically creates camelCasedFunction name
1. Ensures decorated class _actually_ provides a `transform(value)` method, at compile time
1. When using TypeScript both we can and should take advantage of it to reduce errors
1. Convention over configuration
1. Always pure, no confusing `true` defaulting boolean
1. No need for a decorator factory when a simple decorator is cleaner and more maintainable

# **@component** (_decorator factory_)
## _What?_ 
A minimal shorthand for the 90% case
## _How?_ 
Use it just like `@Component()` to enjoy cleaner code and consistant selectors
```TypeScript
@component(template, style) export class DynamicListViewComponent { }
```
  is precicely equivalent to
```TypeScript
@Component({
    template,
    styles: [style]
    selector: 'dynamic-list-view'
})
export class DynamicListViewComponent { }
```
## _Why?_
1. DRY
1. Automatically create snake-cased-element selector
1. Convention over configuration
1. Ensures standard selector naming conventions
1. 99% of the time you only have one stylesheet per component

# @input (_decorator_)
## _What?_
A simple shorthand without an optional name argument
## _How?_
Use it just like `@Input()` except without the parenthesis
```TypeScript
@input initialItems = [];
```
is precicely equivalent to
```TypeScript
@Input() initialItems = [];
```
which is precicesly equivalent to

```TypeScript
@Input('initialItems') initialItems = [];
```

## _Why?_
1. A shorter, cleaner, syntax that ensures standard naming conventions for input bindings
1. Optional argument is 99.9% unsused, so it should be a decorator, not a decorator factory

# @output (_decorator_)

## _What?_
A simple shorthand without an optional name argument

## _How?_
Use it just like `@Output()` except without the parenthesis

```TypeScript
@output itemAdded = new EventEmitter();
```

is precicely equivalent to

```TypeScript
@Output() itemAdded = new EventEmitter();
```

which is precicesly equivalent to

```TypeScript
@Output('itemAdded') itemAdded = new EventEmitter();
```

## _Why?_
1. A shorter, cleaner, syntax that ensures standard naming conventions for output bindings
1. Optional argument is 99.9% unsused, so it should be a decorator, not a decorator factory

# @injectable (_decorator_)

## _What?_ 
A simple dependency injection annotation

## _How?_ 
Use it just like `@Injectable()` except without the parenthesis
```TypeScript
@injectable export class AccountProfileManager {
    constructor(
        readonly accountManager: AccountManager,
        readonly profileManager: ProfileManager
    ) { }
}
```
is precicely equivalent to
```TypeScript
@Injectable() export class AccountProfileManager {
    constructor(
        readonly accountManager: AccountManager,
        readonly profileManager: ProfileManager
    ) { }
}
```

## _Why?_ 
Since `@Injectable` from `'@angular/core'` takes no arguments, so it should be a decorator, not a decorator factory
