The [UI Events](http://www.w3.org/TR/uievents) spec standardizes the `key` and `code` associated with each `KeyboardEvent`. 
[`key`](https://www.w3.org/TR/uievents-key) describes the input character and depends on the logical layout while
[`code`](https://www.w3.org/TR/uievents-code) describes the physical key and depends on the physical layout.

There's an experimental spec for getting the logical layout 
([Keyboard.getLayoutMap()](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/getLayoutMap)), 
but no way to get the physical layout. 
Nevertheless, the UI Events spec is based on a set of reference keyboards and able to accommodate arbitrary keyboards.

This library encodes the reference keyboards as Javascript objects. 
This allows users to construct a visual representation of the keyboard and map codes to physical positions.
See the [demo](http://kaydensigh.github.io/uievents-code-keyboard-layout).
