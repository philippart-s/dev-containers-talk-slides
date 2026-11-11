# SliDesk Plugin: steps

This plugin overrides the `next()` function of slidesk to allow you to have a list which appears step by step.

You have to add a class `steps` on the slides which contain a list.

Appearence speed can be control with an override in `custom.css` by redefining this css variable:

```css
:root {
  --animationSteps: 100ms;
}
```

Each item in the list will appear step by step, with the defined animation speed.

```md
- first
- second
- third
```

If you want to animate your slide content step by step, something else than a list, use the https://slidesk.link/plugins#gouz__sbs plugin.
