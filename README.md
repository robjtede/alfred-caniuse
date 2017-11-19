# alfred-caniuse

> An Alfred 3 workflow for searching and quickly previewing caniuse.com support
> tables.
>
> Configurable "safety" checkmarks are shown next to browsers with good support of a feature.


## Installation

**With easy updates**  
The recommended way to install this workflow is using npm to allow easy updating when also using [alfred-updater](https://github.com/SamVerschueren/alfred-updater).

```shell
$ npm install -g alfred-updater
$ npm intsall -g alfred-caniuse
```

**Without easy updates**  
If you'd prefer to not use npm and forego the easy updates you can go download the latest workflow from the [releases page](https://github.com/robjtede/alfred-caniuse/releases).

## Usage

```
caniuse bdrs
```

![](https://i.imgur.com/RFnM4VW.png)

Pressing enter or tab will autocomplete the item and display the concise support table.

```
caniuse border-radius
```

![](https://i.imgur.com/jl6Tsas.png)

## Configuring

The browserslist configuration is stored in a workflow variable. Shown below:

![](https://i.imgur.com/u2rRIzf.png)

![](https://i.imgur.com/ixsrcan.png)
