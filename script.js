// Update current date
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Load saved habits from localStorage
function loadHabits() {
    const today = new Date().toDateString();
    const savedHabits = JSON.parse(localStorage.getItem('habits') || '{}');
    
    if (savedHabits.date !== today) {
        // Reset habits for new day
        localStorage.setItem('habits', JSON.stringify({ date: today, habits: {} }));
        return {};
    }
    
    return savedHabits.habits;
}

// Save habits to localStorage
function saveHabits(habits) {
    const today = new Date().toDateString();
    localStorage.setItem('habits', JSON.stringify({ date: today, habits }));
}

// Initialize the app
function init() {
    updateDate();
    
    const habits = loadHabits();
    const habitElements = document.querySelectorAll('.habit');
    
    habitElements.forEach(habitElement => {
        const habitName = habitElement.dataset.habit;
        const checkbox = habitElement.querySelector('.checkbox');
        
        // Set initial state
        if (habits[habitName]) {
            checkbox.classList.add('checked');
        }
        
        // Add click event
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            habits[habitName] = checkbox.classList.contains('checked');
            saveHabits(habits);
        });
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', init); 