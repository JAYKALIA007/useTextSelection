# use-text-selections

A React hook that provides enhanced text selection functionality with automatic word boundary detection.

## Installation

```bash
# Install using npm
npm install use-text-selections

# Or using yarn
yarn add use-text-selections
```

## Features

- 📝 Automatic word boundary detection
- 🎯 Tracks text selection across elements
- 🧹 Automatic cleanup on component unmount
- 🔄 Selection state management
- 📋 Easy access to selected text
- 🖱️ Outside click detection

## Usage

```javascript
import React from "react";
// Import useTextSelection as a named export
import { useTextSelection } from "use-text-selections";

function MyComponent() {
  // Initialize the hook to get selection data and clear function
  const { selectionData, clearTextSelection } = useTextSelection();

  return (
    <div>
      <p>
        Try selecting some text in this paragraph. The hook will automatically
        expand the selection to include complete words.
      </p>

      {/* Render UI only when text is selected */}
      {selectionData && (
        <div>
          <p>Selected text: {selectionData}</p>
          <button onClick={clearTextSelection}>Clear Selection</button>
        </div>
      )}
    </div>
  );
}
```

## API

### Returns

The hook returns an object with the following properties:

| Property           | Type     | Description                                                       |
| ------------------ | -------- | ----------------------------------------------------------------- |
| selectionData      | string   | The currently selected text. Empty string if no text is selected. |
| clearTextSelection | function | A function to clear the current text selection.                   |

### Behavior

- The hook automatically expands the selection to include complete words
- Clicking outside the selected area automatically clears the selection
- Selection state is maintained until explicitly cleared or a new selection is made
- All event listeners are automatically cleaned up when the component unmounts

## Complete Example

```javascript
import React from "react";
// Import the hook
import { useTextSelection } from "use-text-selections";

function TextSelector() {
  // Initialize the hook
  const { selectionData, clearTextSelection } = useTextSelection();

  return (
    <div className="text-selector">
      <div className="content">
        <h2>Select some text below:</h2>
        {/* Example text content to demonstrate selection */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Selection info panel */}
      {selectionData && (
        <div className="selection-info">
          <h3>Selected Text:</h3>
          <p>{selectionData}</p>
          <button onClick={clearTextSelection}>Clear Selection</button>
        </div>
      )}
    </div>
  );
}
```

## Browser Support

- Works in all modern browsers that support the Selection API
- Not compatible with React Native (requires DOM environment)

## Requirements

- React 16.8.0 or higher (hooks support)
- DOM environment

## License

MIT © Jay Kalia

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](#).

## Author

Jay Kalia

- GitHub: [@JAYKALIA007](https://github.com/JAYKALIA007)

## Support

If you found this project helpful, please consider giving it a ⭐️ on GitHub!
