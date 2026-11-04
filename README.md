# Hide Top Bar

A SillyTavern extension that hides the top menu bar to give the chat more room.

## Features

- Hide or show the top bar with a checkbox, the **Alt+H** shortcut, or a floating button
- Optional floating button, draggable anywhere on screen (mouse or touch)
- Adjustable button size (20 to 64 px)
- "Reset button position" and "Reset button size" buttons
- All settings are saved between sessions

## Installation

1. Open SillyTavern and go to **Extensions** (the blocks icon).
2. Click **Install extension**.
3. Paste this URL and confirm:
   ```
   https://github.com/Fable8137/hide-top-bar
   ```
4. Reload SillyTavern.

## Usage

Open **Extensions** and find **Hide Top Bar** in the right-hand column.

| Setting | Description |
|---|---|
| Hide the top bar | Hides or shows the bar |
| Show floating button | Enables or disables the floating button |
| Button size | Resizes the floating button |
| Reset button position | Puts the button back in the top-right corner |
| Reset button size | Puts the button back to 32 px |

The floating button can be dragged. A simple click hides or shows the top bar.

**Alt+H** works at all times, even when the floating button is disabled. If the bar is hidden and you have no button, use this shortcut to bring it back.

## Compatibility

Tested with a recent release of SillyTavern. The extension targets the `#top-bar` and `#top-settings-holder` elements. If a future update renames them, the bar may no longer hide.

## License

MIT
