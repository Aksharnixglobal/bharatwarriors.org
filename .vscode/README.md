# Visual Studio Code Setup for Bharat Warriors Website

This repository is now configured for Visual Studio Code development!

## 📋 Getting Started

### 1. Open the project in VS Code
```bash
code /path/to/bharatwarriors.org
```

### 2. Install Recommended Extensions
When you open the project, VS Code will prompt you to install the recommended extensions. Click "Install All" to get:

**Essential Extensions:**
- **Live Server** - Launch a local development server with live reload
- **Prettier** - Code formatter for HTML, CSS, and JavaScript
- **ESLint** - JavaScript linting

**HTML/CSS Extensions:**
- HTML CSS Support
- Auto Rename Tag
- Auto Close Tag
- HTML CSS Class Completion
- CSS Peek

**JavaScript Extensions:**
- JavaScript Snippets
- Path Intellisense

**Productivity Tools:**
- Code Spell Checker
- GitLens
- TODO Highlight
- Better Comments

### 3. Start Development

#### Option A: Using Live Server (Recommended)
1. Open `index.html` in VS Code
2. Right-click in the editor
3. Select "Open with Live Server"
4. Your browser will open at `http://localhost:5500`
5. Any changes you make will automatically reload the page!

#### Option B: Using Debug Configuration
1. Press `F5` or go to Run → Start Debugging
2. Select "Launch Chrome against localhost" or another browser
3. The site will open in your chosen browser

## 🎯 Features Configured

### Auto-formatting
- Files automatically format on save
- Consistent code style across the project
- Indentation set to 4 spaces

### File Associations
- `.html` files → HTML mode
- `.css` files → CSS mode
- `.js` files → JavaScript mode

### Live Preview
- Live Server runs on port 5500
- Auto-reload on file changes
- Chrome set as default browser

### Debugging
Multiple debug configurations available:
- Chrome debugging
- Edge debugging
- Firefox debugging
- Attach to running browser

### Tasks
Run tasks from Terminal → Run Task:
- Start Live Server
- Open in Browser
- Validate HTML Files
- Check for Large Files
- Show Project Structure

## 🎨 Useful Shortcuts

### General
- `Ctrl+P` / `Cmd+P` - Quick file open
- `Ctrl+Shift+P` / `Cmd+Shift+P` - Command palette
- `Ctrl+B` / `Cmd+B` - Toggle sidebar

### Editing
- `Alt+Up/Down` - Move line up/down
- `Ctrl+D` / `Cmd+D` - Select next occurrence
- `Ctrl+/` / `Cmd+/` - Toggle comment
- `Shift+Alt+F` / `Shift+Option+F` - Format document

### Live Server
- Right-click HTML file → "Open with Live Server"
- Click "Go Live" in status bar
- Alt+L Alt+O - Open with Live Server
- Alt+L Alt+C - Stop Live Server

## 📁 Project Structure
```
bharatwarriors.org/
├── .vscode/              # VS Code configuration
│   ├── settings.json     # Editor settings
│   ├── extensions.json   # Recommended extensions
│   ├── launch.json       # Debug configurations
│   └── tasks.json        # Task definitions
├── images/               # Image assets
├── data/                 # Data files
├── index.html           # Main page
├── styles.css           # Main stylesheet
├── script.js            # Main JavaScript file
└── *.html               # Other pages
```

## 🔧 Customization

### Change Port
Edit `.vscode/settings.json`:
```json
"liveServer.settings.port": 5500
```

### Change Browser
Edit `.vscode/settings.json`:
```json
"liveServer.settings.CustomBrowser": "firefox"
```

### Disable Auto-save
Edit `.vscode/settings.json`:
```json
"files.autoSave": "off"
```

## 💡 Tips

1. **Multi-cursor editing**: Hold `Alt` and click to place multiple cursors
2. **Zen Mode**: Press `Ctrl+K Z` for distraction-free coding
3. **Side-by-side editing**: Drag files to split editor
4. **Integrated Terminal**: Press `` Ctrl+` `` to toggle terminal
5. **Git integration**: Use Source Control panel for git operations

## 🐛 Troubleshooting

### Live Server not working?
- Make sure the extension is installed
- Check if port 5500 is available
- Try changing the port in settings

### Extensions not installing?
- Check your internet connection
- Restart VS Code
- Install manually from Extensions panel

### Formatting not working?
- Install Prettier extension
- Set Prettier as default formatter
- Enable format on save in settings

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [HTML Best Practices](https://github.com/hail2u/html-best-practices)

## 🎉 Happy Coding!

Your VS Code environment is now fully configured for efficient web development. Start coding and enjoy the enhanced developer experience!
