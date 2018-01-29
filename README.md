<h1 align="center">
  alfred-caniuse
</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/robjtede/alfred-caniuse/master/alfred-caniuse.png" alt="alfred-caniuse logo" height="200">
</p>

> An Alfred 3 workflow for searching and quickly previewing caniuse.com support tables.
>
> Configurable "safety" checkmarks are shown next to browsers with good support of a feature.

## Installation

**With easy updates**  
The recommended way to install this workflow is using npm to allow easy updating when also using [alfred-updater](https://github.com/SamVerschueren/alfred-updater).

```shell
$ npm install -g alfred-updater
$ npm install -g alfred-caniuse
```

**Without easy updates**  
If you'd prefer to not use npm and forego the easy updates you can go download the latest workflow from the [releases page](https://github.com/robjtede/alfred-caniuse/releases).


## Usage

```
caniuse touch
```

![](https://i.imgur.com/yPTEt85.png)

Pressing enter or tab will autocomplete the item and display the concise support table.

```
caniuse css-touch-action!
```

![](https://i.imgur.com/Ku39XTe.png)


## Configuring

The browserslist configuration is stored in a workflow variable. Shown below:

![](https://i.imgur.com/u2rRIzf.png)

![](https://i.imgur.com/ixsrcan.png)
