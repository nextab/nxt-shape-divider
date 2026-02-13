# Shape Divider for WordPress

> Professional shape dividers for WordPress Block Theme Group blocks - inspired by [shapedivider.app](https://www.shapedivider.app/)

[![WordPress](https://img.shields.io/badge/WordPress-6.0+-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4+-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL%20v2-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Overview

Shape Divider is a lightweight WordPress plugin that extends the core Group block with configurable shape dividers. Add beautiful wave, triangle, arrow, and curve shapes to the top and/or bottom of your sections without writing any code.

**Key Benefits:**
- ✨ Native WordPress integration - works seamlessly with Block Editor
- 🎨 Access to theme colors via native WordPress color picker
- 📱 Fully responsive with mobile optimizations
- ⚡ Zero dependencies - pure Vanilla JavaScript
- 🔧 No page builders required - extends core WordPress blocks

## Features

### 6 Professional Shape Types

- **Wave** - Classic smooth wave pattern
- **Triangle** - Sharp, centered triangle
- **Arrow** - Dynamic arrow pointing design
- **Curve** - Gentle curved transition
- **Waves Opacity** - Layered waves with opacity variations
- **Asymmetric** - Modern asymmetric wave design

### Flexible Configuration

- **Position Control** - Top, bottom, or both dividers simultaneously
- **Height Adjustment** - 20-200px with 5px increments
- **Color Selection** - WordPress native color picker with theme colors
- **Smart Color Inheritance** - Automatically inherits background color when not specified
- **Transformations** - Flip horizontal and invert vertical options
- **Live Preview** - Real-time preview in Block Editor

### Technical Excellence

- **Clean DOM** - Dynamic div injection only when dividers are active
- **No Conflicts** - IIFE pattern prevents JavaScript conflicts
- **Performance** - Minimal footprint, CSS only loaded on frontend
- **Responsive** - Automatic height adjustments for tablets and mobile
- **Theme Compatible** - Works with any WordPress Block Theme

## Installation

### Manual Installation

1. Download the plugin or clone this repository
2. Copy the `nxt-shape-divider` folder to `wp-content/plugins/`
3. Activate the plugin in WordPress Admin → Plugins
4. Start using Shape Dividers in your Group blocks

### Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher
- Block Theme (FSE - Full Site Editing)

## Usage

### Quick Start

1. **Edit a Page/Post** in the WordPress Block Editor
2. **Add or select a Group block** where you want shape dividers
3. **Open Block Settings** (right sidebar)
4. **Find "Shape Divider" panel** in the settings
5. **Enable Top or Bottom Divider** (or both)
6. **Configure your shape:**
   - Select shape type
   - Adjust height
   - Choose color (or leave empty to inherit)
   - Optional: Flip or invert the shape

### Configuration Options

#### Enable Dividers
- Toggle on/off for top and bottom independently
- Only active dividers render in the DOM

#### Shape Selection
Choose from 6 professionally designed shapes:
- Wave (smooth, organic)
- Triangle (sharp, centered)
- Arrow (dynamic, directional)
- Curve (gentle, flowing)
- Waves Opacity (layered, depth)
- Asymmetric (modern, unique)

#### Color Control
- **Native WordPress Color Picker** - Full access to theme colors and custom colors
- **Smart Inheritance** - Leave empty to automatically use the Group block's background color
- **Transparent Support** - Traverses DOM tree to find parent background color

#### Height & Size
- Range: 20px - 200px
- Step: 5px increments
- Responsive: Auto-adjusts on mobile devices

#### Transformations
- **Flip Horizontal** - Mirror the shape horizontally
- **Invert Vertical** - Flip the shape upside down
- Combine both for maximum variation

## Technical Architecture

### Plugin Structure

```
nxt-shape-divider/
├── nxt-shape-divider.php          # Main plugin file
├── README.md                       # This file
├── inc/
│   └── class-shape-divider.php    # Enqueue handler
├── assets/
│   ├── svg/
│   │   └── shapes.js              # SVG shape definitions (6 shapes)
│   ├── js/
│   │   ├── shape-divider-editor.js    # Block Editor integration
│   │   └── shape-divider-frontend.js  # Frontend rendering
│   └── css/
│       └── shape-divider.css      # Styling (frontend only)
```

### How It Works

#### Block Extension via Filters
Uses WordPress block filters to extend `core/group`:
- `blocks.registerBlockType` - Adds custom attributes
- `editor.BlockEdit` - Adds Inspector Controls
- `editor.BlockListBlock` - Adds editor preview
- `blocks.getSaveContent.extraProps` - Saves configuration as data attributes

#### Dynamic Rendering
- **Editor**: JavaScript renders preview divs with inline styles
- **Frontend**: IIFE reads data attributes and injects divider divs on page load
- **No Pseudo-Elements**: Uses real DOM elements for maximum flexibility

#### CSS Strategy
- CSS only loaded on frontend (not in editor)
- Editor uses inline styles for preview
- Prevents WordPress editor layout conflicts

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Extending Shapes

Add custom shapes by editing `assets/svg/shapes.js`:

```javascript
window.NxtShapeDividerShapes = {
	// Existing shapes...
	customShape: {
		label: 'My Custom Shape',
		svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120">...</svg>'
	}
};
```

Use `{{COLOR}}` placeholder for dynamic color replacement.

### CSS Customization

Override default styles in your theme:

```css
.nxt-shape-divider {
	/* Custom z-index, positioning, etc. */
}
```

## Troubleshooting

### Dividers not showing
- Ensure plugin is activated
- Check that Group block has shape divider enabled
- Hard refresh browser (Cmd+Shift+R / Ctrl+F5)

### Color not applying
- Check if color is selected (empty = inherit mode)
- Verify Group block has a background color for inheritance
- Test with manual color selection

### Layout issues in editor
- Plugin removes CSS from editor to prevent conflicts
- Only groups with active dividers get wrapper div
- Check for theme CSS conflicts

### Frontend rendering issues
- Check browser console for JavaScript errors
- Verify shapes.js is loading correctly
- Ensure no JavaScript conflicts with other plugins

## Roadmap

Potential future enhancements:
- [ ] Additional shape library
- [ ] Animation options
- [ ] Custom SVG upload
- [ ] Gradient color support
- [ ] Block pattern library
- [ ] Export/Import configurations

## Credits

**Developed by:** Cursor (with some prompts from [nexTab.de](https://nextab.de) )
**Inspired by:** [Shape Divider App](https://www.shapedivider.app/)  
**License:** GPL v2 or later

## Support

For issues, questions, or contributions, please open an issue on GitHub. Please note that we rarely find the time to update the plugins we provide here as we're too busy working on projects where we're actually making money.

---

Made with ❤️ for the WordPress community