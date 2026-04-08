# Todo List Application

## Overview
A modern, interactive todo list application with priorities, local storage persistence, and animated particle background effects.

## Features
- ✅ **Add/Edit/Remove Tasks** - Full CRUD operations on todo items
- 🎯 **Priority Levels** - Assign high, medium, or low priority to tasks
- 🎨 **Visual Priority Indicators** - Color-coded badges and borders based on priority
- 💾 **Local Storage Persistence** - Tasks automatically save to browser storage
- 📊 **Task Counter** - Live count of total tasks
- ✨ **Animated Background** - Interactive particle effects using particles.js
- 🌙 **Dark Theme** - Modern dark gray background for reduced eye strain

## Quick Start

1. Open `index.html` in a modern web browser
2. Type a task name in the input field
3. Select a priority level (Low, Medium, High)
4. Click "Add" to create the task

## Usage

### Adding Tasks
- Enter task text in the input field
- Choose priority level from dropdown
- Click "Add" button or press Enter

### Managing Tasks
- **Edit**: Click the "Edit" button, modify text, click "Save"
- **Change Priority**: Use the priority dropdown on each task
- **Remove**: Click "Remove" button to delete a task

### Persistence
- All tasks are automatically saved to browser's local storage
- Tasks will remain after closing and reopening the browser

## Project Structure
```
Copilot Trial/
├── index.html           # Main HTML structure and styling
├── script.js            # Application logic and functionality
├── README.md            # Project overview (this file)
└── docs/
    ├── API.md           # Function reference and documentation
    ├── ARCHITECTURE.md  # Code structure and design
    └── SETUP.md         # Installation and setup guide
```

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support (no particles)

## Dependencies
- **particles.js** (via CDN) - Animated particle background
- No other external dependencies

## Local Storage Format
```json
[
  {
    "text": "Task description",
    "priority": "high|medium|low"
  }
]
```

## Future Enhancements
- Due date tracking and sorting
- Task categories/tags
- Dark/light theme toggle
- Export/import functionality
- Task completion checkmarks
