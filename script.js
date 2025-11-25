// Load meal plan data when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the JSON data
        const response = await fetch('data/current-week.json');
        const mealPlan = await response.json();
        
        // Display week info
        displayWeekInfo(mealPlan);
        
        // Display targets
        displayTargets(mealPlan.targets);
        
        // Display meals
        displayMeals(mealPlan.days);
        
    } catch (error) {
        console.error('Error loading meal plan:', error);
        document.getElementById('meal-plan').innerHTML = 
            '<p style="color: red;">Error loading meal plan. Check console for details.</p>';
    }
});

function displayWeekInfo(mealPlan) {
    const weekInfo = document.getElementById('week-info');
    weekInfo.innerHTML = `<strong>Week of ${mealPlan.weekStart} to ${mealPlan.weekEnd}</strong>`;
}

function displayTargets(targets) {
    const targetsDiv = document.getElementById('targets');
    targetsDiv.innerHTML = `
        <strong>📊 Daily Targets:</strong><br>
        Protein: ${targets.protein} | 
        Carbs: ${targets.carbs} | 
        Fat: ${targets.fat} | 
        Calories: ${targets.calories}
    `;
}

function displayMeals(days) {
    const mealPlanDiv = document.getElementById('meal-plan');
    
    days.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        
        // Day header
        const dayHeader = document.createElement('h2');
        dayHeader.textContent = day.date;
        dayCard.appendChild(dayHeader);
        
        // Meals
        day.meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';
            
            const mealName = document.createElement('h3');
            mealName.textContent = `${meal.type}: ${meal.name}`;
            mealDiv.appendChild(mealName);
            
            const mealMeta = document.createElement('div');
            mealMeta.className = 'meal-meta';
            mealMeta.textContent = `⏱️ ${meal.prepTime} | 🔧 ${meal.prepMethod}`;
            mealDiv.appendChild(mealMeta);
            
            const ingredientsList = document.createElement('ul');
            ingredientsList.className = 'ingredients';
            meal.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
            mealDiv.appendChild(ingredientsList);
            
            dayCard.appendChild(mealDiv);
        });
        
        // Daily total
        if (day.dailyTotal) {
            const totalDiv = document.createElement('div');
            totalDiv.className = 'daily-total';
            totalDiv.innerHTML = `
                <strong>Daily Total:</strong> 
                ${day.dailyTotal.calories} cal | 
                ${day.dailyTotal.protein} P | 
                ${day.dailyTotal.carbs} C | 
                ${day.dailyTotal.fat} F
            `;
            dayCard.appendChild(totalDiv);
        }
        
        mealPlanDiv.appendChild(dayCard);
    });
}