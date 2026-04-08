# API Reference

## Core Functions

### `addTodoItem(taskText, priority)`
Creates and adds a new todo item to the list.

**Parameters:**
- `taskText` (string): The task description text
- `priority` (string, optional): Priority level - `'high'`, `'medium'`, or `'low'`. Defaults to `'medium'`

**Returns:** void

**Example:**
```javascript
addTodoItem('Buy groceries', 'high');
```

---

### `updateTaskCount()`
Updates the task counter display with the current number of tasks.

**Parameters:** None

**Returns:** void

**Behavior:**
- Reads the number of child elements in `#todo-list`
- Updates the text content of `#task-count` element
- Called automatically after add/remove operations

---

### `saveTodos()`
Serializes all current tasks and saves them to browser's local storage.

**Parameters:** None

**Returns:** void

**Storage Key:** `'todos'`

**Saved Format:**
```json
[
  { "text": "Task 1", "priority": "high" },
  { "text": "Task 2", "priority": "low" }
]
```

**Called:** After add, edit, remove, or priority change operations

---

### `loadTodos()`
Retrieves saved tasks from local storage and populates the todo list.

**Parameters:** None

**Returns:** void

**Behavior:**
- Reads from localStorage key `'todos'`
- Parses JSON and iterates through each todo
- Calls `addTodoItem()` for each saved task
- Maintains backward compatibility with old text-only format

**Called:** On page load (initialization)

---

## DOM Elements

### Element References
```javascript
const todoInput = document.getElementById('todo-input');        // Input field
const prioritySelect = document.getElementById('priority-select'); // Priority dropdown
const todoList = document.getElementById('todo-list');          // UL container
const taskCount = document.getElementById('task-count');        // Counter span
```

---

## Event Listeners

### Form Submit
```javascript
document.querySelector('.todo-form')?.addEventListener('submit', ...)
```
**Triggered:** When user clicks "Add" or presses Enter in form

**Action:** Calls `addTodoItem()` with input text and selected priority

---

## CSS Classes

### Task Priority Classes
- `.priority-high` - Red left border, light red background
- `.priority-medium` - Yellow left border, light yellow background
- `.priority-low` - Green left border, light green background

### Component Classes
- `.todo-item` - Main task container
- `.priority-badge` - Priority label badge
- `.priority-select` - Inline priority dropdown
- `.edit-input` - Text input during edit mode

---

## Data Storage

### localStorage Schema
**Key:** `'todos'`

**Type:** JSON Array of Objects

**Structure:**
```json
[
  {
    "text": "string - task description",
    "priority": "string - 'high' | 'medium' | 'low'"
  }
]
```

**Example:**
```json
[
  { "text": "Complete project", "priority": "high" },
  { "text": "Buy milk", "priority": "low" },
  { "text": "Call therapist", "priority": "medium" }
]
```
