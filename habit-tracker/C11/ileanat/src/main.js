const form = document.getElementById('habit_form')
const habits = []

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const data = new FormData(event.target)

    const habit = {
        name: data.get('habit_name'),
        targetStreak: Number(data.get('target_streak')),
        completedDates: []
    }

    habits.push(habit)



    console.log(JSON.stringify(habits))

    renderHabits(habits)
})

//count total completion days
function calculateStreak(habit) {
    return habit.completedDates.length
}

//check if done on a specific date
function isHabitCompleted(habit, date){
    return habit.completedDates.includes(date)
}

//makes it so theres 10 points per completion
function getPoints(habit){
    return calculateStreak(habit) * 10
}

const renderHabits = (habits) => {
    const habitList = document.getElementById('habit_list')

    habitList.innerHTML = habits.map(habit => {
        return `<li>${habit.name} - Target: ${habit.targetStreak} days <br>
        Streak: ${calculateStreak(habit)} <br>
        Points: ${getPoints(habit)} <br>
        <button onclick="markCompleted('${habit.name}')">Completed today!</button>
        </li>`
    
    }).join('\n')
}

// marks a habit done today
window.markCompleted = (habitName) => {
    const habit = habits.find(h => h.name === habitName)
    const today = new Date().toISOString().split('T')[0] // in YYYY-MM-DD format

    if (!isHabitCompleted(habit, today)) {
        habit.completedDates.push(today)
    }

    renderHabits(habits)
}
