# Hide Top Bar

A SillyTavern extension that hides the top menu bar to give the chat more room.

**THIS IS A VIBECODED EXTENSION !**

My skills in coding are very weak, so please be aware of that. Everything should works, thought. If it isn't the case, please open an issue and I'll see what I can do. 

Made with Claude (Sonet 5.5)

## Features

- Hide or show the top bar with a checkbox, a customizable keyboard shortcut (**Alt+H** by default), or a floating button
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
| Change shortcut | Click, then press a new combination (must include Ctrl, Alt or Meta). Esc cancels |
| Reset shortcut | Goes back to Alt+H |

The floating button can be dragged. A simple click hides or shows the top bar.

The keyboard shortcut works at all times, even when the floating button is disabled. If the bar is hidden and you have no button, use it to bring the bar back. Some combinations (such as Ctrl+W or Ctrl+T) are reserved by the browser and cannot be used.

## Compatibility

Tested with a recent release of SillyTavern. The extension targets the `#top-bar` and `#top-settings-holder` elements. If a future update renames them, the bar may no longer hide.

## Troubleshooting

### The "Hide Top Bar" drawer does not appear in Extensions

- Make sure the extension folder is named exactly `hide-top-bar`. The extension loads its files from that path, so a different folder name prevents it from loading. If you installed it from the GitHub URL, the repository name must not have been changed.
- Reload SillyTavern with **Ctrl+F5** (hard refresh).
- Open the browser console (**F12**) and look for a red error mentioning `hide-top-bar`. If you edited the files by hand, a missing bracket or a duplicated function in `index.js` is the most common cause.
- Check that `manifest.json`, `index.js`, `settings.html` and `style.css` are all in the extension folder, at the same level.

### The top bar does not hide, or a blank strip remains at the top

The extension targets the `#top-bar` and `#top-settings-holder` elements, and resets the `--topBarBlockSize` variable. If a SillyTavern update renamed them, the bar may not hide. Right-click the bar, choose **Inspect**, and note the `id` of the element. You can then open an issue with that information.

### The setting is not kept after reloading

Settings are saved when you toggle the checkbox, use **Alt+H**, click the floating button, or release the size slider. If a setting is still lost, check the console (**F12**) for errors, and make sure SillyTavern can write to its data folder.

### The bar is hidden and I cannot get it back

Press **Alt+H**. The shortcut works even when the floating button is disabled. Once the bar is back, open **Extensions → Hide Top Bar** and re-enable the floating button if you want it.

### The keyboard shortcut does nothing

Another extension, your browser or your operating system may be using that combination. Click inside the SillyTavern page first, then try again. If it is still blocked, open **Extensions → Hide Top Bar**, click **Change shortcut** and pick another combination, or click **Reset shortcut** to go back to Alt+H.

### The floating button is off-screen or hard to reach

Open **Extensions → Hide Top Bar** and click **Reset button position** to put it back in the top-right corner. If it is too small or too large, use the **Button size** slider, or **Reset button size** to return to 32 px.

### The floating button overlaps another element

Drag it to another spot. Its position is saved. If it is still in the way, you can also lower its size with the slider.

### The floating button does not show up

Check that **Show floating button** is ticked in the drawer. If it is, reload the page and look in the corners of the window, in case its saved position falls outside a smaller window. In that case, click **Reset button position**.

## License

MIT
