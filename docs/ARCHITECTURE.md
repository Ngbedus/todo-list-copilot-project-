# Architecture

## Project Structure

```
Copilot Trial/
├── index.html              HTML markup & CSS styling
├── script.js               JavaScript application logic
├── README.md               Project overview
└── docs/
    ├── API.md              Function reference
    ├── ARCHITECTURE.md     This file
    └── SETUP.md            Setup instructions
```

## Code Organization

### index.html
**Responsibility:** Page structure, styling, and layout

**Key Sections:**
1. **HTML Structure**
   - Form for input and priority selection
   - Container for todo list items
   - Task counter display
   - Particle canvas background

2. **CSS Styling**
   - Dark theme (dark gray background)
   - Responsive layout (max-width: 480px)
   - Priority-based visual differentiation
   - Component styling (buttons, inputs, badges)
   - Particle canvas styling (fixed, z-index: -1)

3. **Scripts**
   - Loads particles.js from CDN
   - Loads local script.js

---

### script.js
**Responsibility:** Application logic and state management

**Key Components:**

#### 1. DOM References
Stores references to key HTML elements for efficient access:
- `todoInput` - Text input field
- `prioritySelect` - Priority level dropdown
- `todoList` - Container for task items
- `taskCount` - Counter display element

#### 2. State Management Functions
- `saveTodos()` - Persist state to localStorage
- `loadTodos()` - Restore state from localStorage
- `updateTaskCount()` - Update UI counter

#### 3. Task Operations
- `addTodoItem(taskText, priority)` - Create and insert task
  - Builds DOM elements for task
  - Attaches event listeners
  - Updates UI and storage

#### 4. Event Handlers
**Edit Button:**
- Toggle between view and edit modes
- Swap between span (display) and input (edit)
- Save changes to localStorage

**Priority Selector:**
- Change task priority
- Update visual styling (border color, background)
- Save changes to localStorage

**Remove Button:**
- Delete task item
- Update counter
- Save changes to localStorage

**Form Submit:**
- Prevent default form behavior
- Extract input and priority
- Call `addTodoItem()`
- Clear input field

#### 5. Particle Animation
Particles.js configuration:
- 80 particles with mouse interaction
- Particles repel on hover
- Particles spawn on click
- Connected via lines at 150px distance

---

## Data Flow

### Adding a Task
```
User Input → Form Submit → addTodoItem()
  ↓
Create DOM Elements
  ↓
Attach Event Listeners
  ↓
Insert into DOM
  ↓
Update Counter
  ↓
Save to localStorage
  ↓
UI Updated
```

### Editing a Task
```
Click Edit → Show Input Field → User Types → Click Save
  ↓
Extract New Text
  ↓
Update span.textContent
  ↓
Hide Input Field
  ↓
saveTodos()
  ↓
localStorage Updated
```

### Loading Application
```
Page Load
  ↓
Define Global Variables
  ↓
setupEventListeners()
  ↓
initializeParticles()
  ↓
loadTodos() from localStorage
  ↓
Render All Tasks
  ↓
updateTaskCount()
  ↓
Application Ready
```

---

## Storage Architecture

### localStorage Usage
**Key:** `'todos'`

**Format:** JSON stringified array of objects

**Serialization:**
```javascript
const todos = Array.from(todoList.children).map(item => ({
  text: item.querySelector('span').textContent,
  priority: item.getAttribute('data-priority') || 'medium'
}));
localStorage.setItem('todos', JSON.stringify(todos));
```

**Deserialization:**
```javascript
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
```

**Backward Compatibility:** Handles both old format (text strings) and new format (objects with priority)

---

## Styling Strategy

### Priority Colors
- **High:** Red (#ff5f7a) - urgent tasks
- **Medium:** Yellow (#ffc93c) - standard tasks
- **Low:** Green (#4caf50) - optional tasks

### Visual Hierarchy
- Left border (5px) for priority indication
- Background tint matching priority color
- Badge label for text confirmation
- Dropdown for easy priority changes

---

## Performance Considerations

1. **DOM Updates:** Batch updates where possible
2. **Event Delegation:** Could be optimized with event delegation instead of individual listeners
3. **localStorage:** Synchronous operations - acceptable for small datasets
4. **Array Operations:** Using Array.from() for converting NodeList

---

## Browser APIs Used

- **DOM API:** createElement, querySelector, appendChild, setAttribute
- **localStorage:** getItem, setItem
- **JSON:** parse, stringify
- **Event System:** addEventListener, preventDefault
- **String Methods:** trim, charAt, slice, textContent
