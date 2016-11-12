# ng2-conventions-decorators

[![GitHub release](https://img.shields.io/github/release/aluanhaddad/ng2-conventions-decorators.svg)](https://github.com/aluanhaddad/ng2-conventions-decorators/releases/latest)
[![npm](https://img.shields.io/npm/v/ng2-conventions-decorators.svg)](https://www.npmjs.com/package/ng2-conventions-decorators)
[![npm](https://img.shields.io/npm/l/ng2-conventions-decorators.svg)](https://github.com/aluanhaddad/ng2-conventions-decorators/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/ng2-conventions-decorators.svg)](https://www.npmjs.com/package/ng2-conventions-decorators)
[![Build Status](https://travis-ci.org/aluanhaddad/ng2-conventions-decorators.svg?branch=master)](https://travis-ci.org/aluanhaddad/ng2-conventions-decorators)
A set of minimal decorators for Angular2 that leverage established conventions to reduce boilerplate, enforce consistent APIs, and leverage static type analysis.

# Rationale
Angular 2 is very heavy on configuration, considerably heavier than AngularJS.
For example, html element component directives should be given a kebab-case-name tag-name. This is both an official recommendation and a standard html convention. 
However, while AngularJS used a simple, easy to understand transformation to create these tag-names,

JavaScript
```JavaScript
function someCustomElement() { ... }

angular.directive({ someCustomElement });
```
HTML
```html
<some-custom-element></some-custom-element>
```

Angular 2 requires the tag-name be explicitly specified as a property of the component decorator factory's configuration object.
This is just one of many examples but it clearly demonstrates the following issues:

1. Violates DRY.
1. Harder to maintain: You have to keep even more names in sync when refactoring.
1. Verbose: Redundantly species configuration in strings.
1. Error prone: Heavy use of optionality and simple strings fail to leverage strengths of Angular 2's foundational tools (e.g. TypeScript). 
1. Hard to teach: Recommended practices are now optional, but still expected, just optional. Angular 2 is opinionated, so there is no argument for flexibility or agnosticism.
1. Harder to maintain: To know the tag name you need to use in html you have to read every component's definition or documentation.


-----
# Installation
_jspm_
```powershell 
jspm i ng2-conventions-decorators
```
_npm_
```powershell 
npm i ng2-conventions-decorators --save
```

# API

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
is precisely equivalent to
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
1. Convention over configuration
1. Always pure, no confusing `true` defaulting boolean
1. Ensures decorated class _actually_ provides a `transform(value)` method at compile time
1. When using TypeScript we both can and should take advantage of its semantic error checking
1. No need for a decorator factory when a simple decorator is cleaner and more maintainable

# **@component** (_decorator factory_)
## _What?_ 
A minimal shorthand for the 90% case
## _How?_ 
Use it just like `@Component()` to enjoy cleaner code and consistent selectors
```TypeScript
@component(template, style) export class DynamicListViewComponent { }
```
  is precisely equivalent to
```TypeScript
@Component({
    template,
    styles: [style],
    selector: 'dynamic-list-view'
})
export class DynamicListViewComponent { }
```
Need additional configuration?
```TypeScript
@component(template, style, {
    directives: [ListItem]
})
export class DynamicListViewComponent { }
```
## _Why?_
1. DRY
1. Automatically create kebab-cased-element selector
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
is precisely equivalent to
```TypeScript
@Input() initialItems = [];
```
which is precisely equivalent to

```TypeScript
@Input('initialItems') initialItems = [];
```

## _Why?_
1. A shorter, cleaner, syntax that ensures standard naming conventions for input bindings
1. Optional argument is 99.9% unused, so it should be a decorator, not a decorator factory

# @output (_decorator_)

## _What?_
A simple shorthand without an optional name argument

## _How?_
Use it just like `@Output()` except without the parenthesis

```TypeScript
@output itemAdded = new EventEmitter();
```

is precisely equivalent to

```TypeScript
@Output() itemAdded = new EventEmitter();
```

which is precisely equivalent to

```TypeScript
@Output('itemAdded') itemAdded = new EventEmitter();
```

## _Why?_
1. A shorter, cleaner, syntax that ensures standard naming conventions for output bindings
1. Optional argument is 99.9% unused, so it should be a decorator, not a decorator factory

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
is precisely equivalent to
```TypeScript
@Injectable() export class AccountProfileManager {
    constructor(
        readonly accountManager: AccountManager,
        readonly profileManager: ProfileManager
    ) { }
}
```

## _Why?_ 
Since `@Injectable` from `'@angular/core'` takes no arguments, it should be a decorator, not a decorator factory


# Implementation
As a quick look through the source will illustrate, all of the above are implemented by delegating to the underlying @angular/core so meaning that stay in sync and up to date.
