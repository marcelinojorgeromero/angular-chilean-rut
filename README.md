# angular-chilean-rut

##### v. 0.0.1

### Installation
In order to use this app you'll have to include the module in your app's main module (or in whatever module you need it!) 
```sh
angular.module("your_app", ["mjr.rut"]);
```

### Usage

Then you can use it like this:

```sh
<rut-input format-options='{"bodyDelimiter":".", "dvDelimiter":"-"}'></rut-input>
```

Custom input with rut formatter:
```sh
<input type="text" ng-model="vm.rutmodel" rut-formatter='{"bodyDelimiter":".", "dvDelimiter":"-"}'>
```

Custom input with validator and formatter:
```sh
<input type="text" ng-model="vm.rutmodel" rut-validator="" rut-formatter='{"bodyDelimiter":".", "dvDelimiter":"-"}' class="form-control">
```

### Formatter Directive
The `rut-formatter` directive formats the rut and accepts a json string with format options. 

##### usage:
```sh
<input type="text" ... rut-formatter='{"bodyDelimiter":".", "dvDelimiter":"-"}'>
```

##### Format options:

  - `bodyDelimiter`: Specifies the char for formatting the body of the rut
  - `dvDelimiter`: Specifies the char for separating the check digit (digito verificador) from the rest of the rut.
  - `formatBody`: boolean value that specifies if the body will be formatted.
  - `formatDv`: boolean that specifies if the check digit (digito verificador) will be formatted.

### Validator Directive

The `rut-validator` directive validates the rut. Updates the model once the rut is valid. Does not accept any parameters.

### Rut Filter

I also provide a filter (`rutFilter`) for cases when we need to format a rut in a different element than input text.

##### usage:

```sh
{{ vm.rutmodel | rutFilter }}
```





License
----

MIT


**Free Software, Hell Yeah!**


