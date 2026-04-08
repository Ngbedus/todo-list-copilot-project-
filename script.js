/**
 * TODO LIST APPLICATION - Main Script
 * 
 * Features:
 * - Add, edit, remove todo items
 * - Set priority levels (high, medium, low)
 * - Persist data to localStorage
 * - Generate animated particle background
 * - Live task counter
 * 
 * Dependencies:
 * - particles.js (from CDN)
 * 
 * Author: Todo App
 * Version: 1.0
 */

// ==========================================
// DOM Element References
// ==========================================

// Input field for new task text
const todoInput = document.getElementById('todo-input');

// Dropdown selector for priority level
const prioritySelect = document.getElementById('priority-select');

// Date input field for task due date
const todoDate = document.getElementById('todo-date');

// Container (UL element) holding all task items
const todoList = document.getElementById('todo-list');

// Span displaying total number of tasks
const taskCount = document.getElementById('task-count');

// ==========================================
// STATE MANAGEMENT FUNCTIONS
// ==========================================

/**
 * Updates the task counter display with current count of todo items
 * Reads the number of children in todoList and updates the DOM
 * Called after add/remove operations
 */
function updateTaskCount() {
    if (!taskCount) {
        return;
    }
    taskCount.textContent = String(todoList.children.length);
}

/**
 * Saves all current tasks to browser's localStorage
 * Serializes task data (text + priority + dueDate) as JSON
 * Storage key: 'todos'
 * 
 * localStorage format:
 * [
 *   { "text": "Task 1", "priority": "high", "dueDate": "2024-12-31" },
 *   { "text": "Task 2", "priority": "low", "dueDate": "" }
 * ]
 */
function saveTodos() {
    const todos = Array.from(todoList.children).map(item => ({
        text: item.querySelector('span').textContent,
        priority: item.getAttribute('data-priority') || 'medium',
        dueDate: item.getAttribute('data-due-date') || ''
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Loads saved tasks from localStorage and populates the todo list
 * Handles backward compatibility with old text-only format
 * Called on page initialization
 */
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todo => {
        // Support old format (string) and new format (object with priority and dueDate)
        const priority = typeof todo === 'string' ? 'medium' : (todo.priority || 'medium');
        const text = typeof todo === 'string' ? todo : todo.text;
        const dueDate = typeof todo === 'string' ? '' : (todo.dueDate || '');
        addTodoItem(text, priority, dueDate);
    });
}

// ==========================================
// MAIN TASK OPERATIONS
// ==========================================

/**
 * Creates and adds a new todo item to the list with full functionality
 * 
 * @param {string} taskText - The task description text
 * @param {string} priority - Priority level: 'high', 'medium', 'low' (default: 'medium')
 * @param {string} dueDate - Optional due date in YYYY-MM-DD format (default: '')
 * 
 * Creates:
 * - Task container (LI element)
 * - Task text display (SPAN)
 * - Due date display (if provided)
 * - Priority badge label
 * - Priority dropdown selector
 * - Edit/Save toggle button
 * - Remove button
 * 
 * Attaches event listeners for all interactions and saves to storage
 */
function addTodoItem(taskText, priority = 'medium', dueDate = '') {
    // Trim and validate input
    const text = taskText.trim();
    if (!text) {
        return;
    }

    // ========== Create Container ==========
    const item = document.createElement('li');
    item.className = `todo-item priority-${priority}`;
    item.setAttribute('data-priority', priority);
    item.setAttribute('data-due-date', dueDate);

    // ========== Create Text Display ==========
    const label = document.createElement('span');
    label.textContent = text;

    // ========== Create Priority Badge ==========
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge ${priority}`;
    priorityBadge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

    // ========== Create Due Date Display (if provided) ==========
    const dueDateDisplay = document.createElement('span');
    dueDateDisplay.className = 'due-date';
    if (dueDate) {
        // Format date to readable format (e.g., "Due: Dec 31, 2024")
        const dateObj = new Date(dueDate + 'T00:00:00');
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dueDateDisplay.textContent = `Due: ${dateObj.toLocaleDateString('en-US', options)}`;
        dueDateDisplay.style.display = 'inline-block';
    } else {
        dueDateDisplay.style.display = 'none';
    }

    // ========== Create Priority Selector ==========
    const prioritySelector = document.createElement('select');
    prioritySelector.className = 'priority-select';
    prioritySelector.innerHTML = '<option value=\"low\">Low</option><option value=\"medium\" selected>Medium</option><option value=\"high\">High</option>';
    prioritySelector.value = priority;
    
    // Event handler: Update priority when selector changes
    prioritySelector.addEventListener('change', (e) => {
        const newPriority = e.target.value;
        // Update CSS class for visual styling
        item.className = `todo-item priority-${newPriority}`;
        item.setAttribute('data-priority', newPriority);
        // Update badge styling and text
        priorityBadge.className = `priority-badge ${newPriority}`;
        priorityBadge.textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
        prioritySelector.value = newPriority;
        // Persist to storage
        saveTodos();
    });

    // ========== Create Edit Button ==========
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit';
    
    // Event handler: Toggle between edit and view modes
    editButton.addEventListener('click', () => {
        const isEditing = editButton.textContent === 'Save';
        
        if (!isEditing) {
            // === ENTER EDIT MODE ===
            // Create editable input field
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = label.textContent;
            
            // Replace span with input field
            item.insertBefore(editInput, label);
            item.removeChild(label);
            editInput.focus();
            
            // Update button text
            editButton.textContent = 'Save';
        } else {
            // === SAVE CHANGES ===
            const editInput = item.querySelector('.edit-input');
            if (!editInput) {
                return;
            }
            
            // Get new text and validate
            const newText = editInput.value.trim();
            if (!newText) {
                editInput.focus();
                return;
            }
            
            // Update label with new text
            label.textContent = newText;
            // Replace input with span
            item.insertBefore(label, editInput);
            item.removeChild(editInput);
            
            // Reset button to 'Edit'
            editButton.textContent = 'Edit';
            
            // Persist changes
            saveTodos();
        }
    });

    // ========== Create Remove Button ==========
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    
    // Event handler: Delete task
    removeButton.addEventListener('click', () => {
        item.remove();
        updateTaskCount();
        saveTodos();
    });

    // ========== Assemble and Insert ==========
    item.appendChild(label);
    item.appendChild(dueDateDisplay);
    item.appendChild(priorityBadge);
    item.appendChild(prioritySelector);
    item.appendChild(editButton);
    item.appendChild(removeButton);
    todoList.appendChild(item);

    // Update UI and storage
    updateTaskCount();
    saveTodos();
    
    // Clear input and refocus for next entry
    todoInput.value = '';
    todoDate.value = '';
    todoInput.focus();
}

// ==========================================
// INITIALIZATION
// ==========================================

// Initialize counter display
updateTaskCount();

// Load any previously saved tasks from localStorage
loadTodos();

// ==========================================
// FORM EVENT HANDLING
// ==========================================

/**
 * Form submit handler: Creates new todo from form inputs
 * Prevents default form submission and calls addTodoItem with:
 * - Text from input field
 * - Priority from dropdown selector
 * - Due date from date input (optional)
 */
document.querySelector('.todo-form')?.addEventListener('submit', event => {
    event.preventDefault();
    if (todoInput) {
        const priority = prioritySelect?.value || 'medium';
        const dueDate = todoDate?.value || '';
        addTodoItem(todoInput.value, priority, dueDate);
    }
});

// ==========================================
// PARTICLE BACKGROUND ANIMATION
// ==========================================

/**
 * Initialize particles.js with custom configuration
 * Creates animated particle effect on page background
 * 
 * Configuration includes:
 * - 80 particles with density-based distribution
 * - White/light particles connected by lines
 * - Mouse hover repulsion effect
 * - Click to spawn new particles
 * - Smooth movement animation
 */
particlesJS('particles-js', {
    particles: {
        // Number of particles and density
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        // Particle color
        color: {
            value: '#f0f0f5'
        },
        // Particle shape
        shape: {
            type: 'circle'
        },
        // Particle opacity
        opacity: {
            value: 0.5,
            random: false
        },
        // Particle size
        size: {
            value: 3,
            random: true
        },
        // Lines connecting nearby particles
        line_linked: {
            enable: true,
            distance: 150,
            color: '#eaebf6',
            opacity: 0.4,
            width: 1
        },
        // Particle movement
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    // Mouse interaction settings
    interactivity: {
        detect_on: 'canvas',
        events: {
            // Hover effect: particles repel from cursor
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            // Click effect: spawn new particles
            onclick: {
                enable: true,
                mode: 'push'
            }
        },
        modes: {
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    // Adjust for high-DPI displays (retina)
    retina_detect: true
});

// ==========================================
// FEATURE PLACEHOLDERS
// ==========================================
// [FUTURE] Add a way to edit an existing item on the list.
// [FUTURE] Update the task count when an item is added or removed.
// [FUTURE] Save the list to local storage so that it persists across page reloads.
// [PLANNED] Allow user to select a priority level for each task (e.g., high, medium, low) and visually differentiate tasks based on their priority.
// [BACKLOG] Allow user to add a due date for each task and sort the list based on due dates.
