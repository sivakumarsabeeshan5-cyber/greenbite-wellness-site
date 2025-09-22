// Global variables
let currentTipIndex = 0;
let rotatingTexts = [
    "Nourish Your Body & Mind",
    "Energetic Nutrition. Empowered Living.",
    "Start Your Wellness Journey Today",
    "Balance Your Meals, Exercise, and Mindfulness"
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Initialize navigation
    initNavigation();
    
    // Initialize rotating text if on homepage
    if (document.getElementById('rotating-text')) {
        initRotatingText();
        showDailyTip();
    }
    
    // Initialize newsletter form if exists
    if (document.getElementById('newsletter-form')) {
        initNewsletterForm();
    }
    
    // Page-specific initializations
    if (document.body.classList.contains('recipes-page')) {
        initRecipesPage();
    } else if (document.body.classList.contains('calculator-page')) {
        initCalculatorPage();
    } else if (document.body.classList.contains('workout-page')) {
        initWorkoutPage();
    } else if (document.body.classList.contains('mindfulness-page')) {
        initMindfulnessPage();
    } else if (document.body.classList.contains('contact-page')) {
        initContactPage();
    }
}

// Navigation functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Rotating text for homepage
function initRotatingText() {
    const rotatingText = document.getElementById('rotating-text');
    if (!rotatingText) return;
    
    // Change text every 3 seconds
    setInterval(() => {
        currentTipIndex = (currentTipIndex + 1) % rotatingTexts.length;
        rotatingText.textContent = rotatingTexts[currentTipIndex];
        rotatingText.classList.add('fade-in');
        
        setTimeout(() => {
            rotatingText.classList.remove('fade-in');
        }, 1000);
    }, 3000);
}

// Daily health tip
function showDailyTip() {
    const dailyTipElement = document.getElementById('daily-tip-text');
    if (!dailyTipElement) return;
    
    const tips = [
        "Drink at least 8 glasses of water daily to stay hydrated.",
        "Include a variety of colorful vegetables in your meals for diverse nutrients.",
        "Take a 10-minute walk after meals to aid digestion.",
        "Practice deep breathing for 5 minutes to reduce stress.",
        "Get 7-8 hours of sleep for optimal health and recovery.",
        "Limit processed foods and opt for whole foods instead.",
        "Stretch daily to improve flexibility and reduce muscle tension.",
        "Practice gratitude by noting three things you're thankful for each day."
    ];
    
    // Get a tip based on the day of the year
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const tipIndex = dayOfYear % tips.length;
    
    dailyTipElement.textContent = tips[tipIndex];
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const messageElement = document.getElementById('newsletter-message');
        
        if (!validateEmail(emailInput.value)) {
            showMessage(messageElement, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Save to localStorage
        saveToLocalStorage('newsletterEmails', emailInput.value);
        
        // Show success message
        showMessage(messageElement, 'Thank you for subscribing to our newsletter!', 'success');
        
        // Reset form
        newsletterForm.reset();
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show message
function showMessage(element, message, type) {
    element.textContent = message;
    element.style.color = type === 'success' ? '#4CAF50' : '#F44336';
    
    // Clear message after 3 seconds
    setTimeout(() => {
        element.textContent = '';
    }, 3000);
}

// LocalStorage functions
function saveToLocalStorage(key, value) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    
    // Avoid duplicates
    if (!items.includes(value)) {
        items.push(value);
        localStorage.setItem(key, JSON.stringify(items));
    }
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Recipes page
function initRecipesPage() {
    // Sample recipe data
    const recipes = [
        {
            id: 1,
            title: "Avocado Toast with Poached Eggs",
            description: "A nutritious breakfast packed with healthy fats and protein.",
            image: "./1.avif",
            category: "Breakfast",
            ingredients: [
                "2 slices whole grain bread",
                "1 ripe avocado",
                "2 eggs",
                "1 tbsp lemon juice",
                "Salt and pepper to taste",
                "Red pepper flakes (optional)"
            ],
            steps: [
                "Toast the bread until golden and crisp.",
                "Mash the avocado with lemon juice, salt, and pepper.",
                "Poach the eggs in simmering water for 3-4 minutes.",
                "Spread the mashed avocado on toast and top with poached eggs.",
                "Season with salt, pepper, and red pepper flakes if desired."
            ],
            nutrition: {
                calories: 350,
                protein: "15g",
                carbs: "25g",
                fat: "22g",
                fiber: "10g"
            }
        },
        {
            id: 2,
            title: "Quinoa Salad with Roasted Vegetables",
            description: "A colorful and protein-rich salad perfect for lunch.",
            image: "./2.avif",
            category: "Lunch",
            ingredients: [
                "1 cup quinoa, rinsed",
                "2 cups vegetable broth",
                "1 bell pepper, diced",
                "1 zucchini, diced",
                "1 cup cherry tomatoes, halved",
                "1/4 cup feta cheese, crumbled",
                "2 tbsp olive oil",
                "1 tbsp lemon juice",
                "1 tsp dried oregano",
                "Salt and pepper to taste"
            ],
            steps: [
                "Preheat oven to 400°F (200°C).",
                "Cook quinoa in vegetable broth according to package instructions.",
                "Toss vegetables with olive oil, salt, and pepper. Roast for 20 minutes.",
                "In a large bowl, combine cooked quinoa and roasted vegetables.",
                "Add feta cheese, lemon juice, and oregano. Mix well and serve."
            ],
            nutrition: {
                calories: 320,
                protein: "12g",
                carbs: "45g",
                fat: "10g",
                fiber: "8g"
            }
        },
        {
            id: 3,
            title: "Grilled Salmon with Asparagus",
            description: "A delicious and healthy dinner rich in omega-3 fatty acids.",
            image: "./3.avif",
            category: "Dinner",
            ingredients: [
                "2 salmon fillets",
                "1 bunch asparagus, trimmed",
                "2 tbsp olive oil",
                "2 cloves garlic, minced",
                "1 lemon, sliced",
                "1 tsp dried dill",
                "Salt and pepper to taste"
            ],
            steps: [
                "Preheat grill to medium-high heat.",
                "Rub salmon and asparagus with olive oil, garlic, dill, salt, and pepper.",
                "Grill salmon for 4-5 minutes per side, until flaky.",
                "Grill asparagus for 5-7 minutes, until tender-crisp.",
                "Serve salmon with asparagus and lemon slices."
            ],
            nutrition: {
                calories: 420,
                protein: "35g",
                carbs: "8g",
                fat: "28g",
                fiber: "4g"
            }
        },
        {
            id: 4,
            title: "Berry Smoothie Bowl",
            description: "A refreshing and antioxidant-rich breakfast or snack.",
            image: "./4.avif",
            category: "Breakfast",
            ingredients: [
                "1 cup frozen mixed berries",
                "1 banana",
                "1/2 cup Greek yogurt",
                "2 tbsp almond milk",
                "1 tbsp honey (optional)",
                "Toppings: granola, sliced banana, berries, chia seeds"
            ],
            steps: [
                "In a blender, combine frozen berries, banana, yogurt, and almond milk.",
                "Blend until smooth, adding more milk if needed.",
                "Pour into a bowl and add desired toppings.",
                "Drizzle with honey if desired and serve immediately."
            ],
            nutrition: {
                calories: 280,
                protein: "12g",
                carbs: "45g",
                fat: "6g",
                fiber: "9g"
            }
        },
        {
            id: 5,
            title: "Chickpea Curry",
            description: "A flavorful and protein-packed vegetarian curry.",
            image: "./5.avif",
            category: "Dinner",
            ingredients: [
                "2 cans chickpeas, drained and rinsed",
                "1 onion, diced",
                "2 cloves garlic, minced",
                "1 tbsp ginger, grated",
                "1 can coconut milk",
                "2 tbsp curry powder",
                "1 tsp turmeric",
                "1 tsp cumin",
                "2 cups spinach",
                "Salt to taste",
                "Fresh cilantro for garnish"
            ],
            steps: [
                "Sauté onion, garlic, and ginger until softened.",
                "Add spices and cook for 1 minute until fragrant.",
                "Add chickpeas and coconut milk. Simmer for 15 minutes.",
                "Stir in spinach and cook until wilted.",
                "Garnish with cilantro and serve with rice or naan."
            ],
            nutrition: {
                calories: 380,
                protein: "15g",
                carbs: "45g",
                fat: "18g",
                fiber: "12g"
            }
        },
        {
            id: 6,
            title: "Greek Yogurt Parfait",
            description: "A layered parfait with Greek yogurt, fruits, and granola.",
            image: "./6.avif",
            category: "Snack",
            ingredients: [
                "1 cup Greek yogurt",
                "1/2 cup mixed berries",
                "1/4 cup granola",
                "1 tbsp honey",
                "1 tbsp chia seeds (optional)"
            ],
            steps: [
                "In a glass, layer half of the yogurt.",
                "Add a layer of berries and some granola.",
                "Repeat layers with remaining ingredients.",
                "Drizzle with honey and sprinkle with chia seeds.",
                "Serve immediately or refrigerate until ready to eat."
            ],
            nutrition: {
                calories: 250,
                protein: "20g",
                carbs: "28g",
                fat: "8g",
                fiber: "5g"
            }
        }
    ];

    // Render recipes
    renderRecipes(recipes);
    
    // Initialize filter functionality
    initRecipeFilters(recipes);
}

// Render recipes to the page
function renderRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    if (!recipesContainer) return;
    
    recipesContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-categories">
                    <span class="recipe-category">${recipe.category}</span>
                </div>
                <button class="btn btn-primary view-recipe" data-id="${recipe.id}">View Recipe</button>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
    
    // Add event listeners to view recipe buttons
    document.querySelectorAll('.view-recipe').forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = parseInt(this.getAttribute('data-id'));
            openRecipeModal(recipeId);
        });
    });
}

// Initialize recipe filters
function initRecipeFilters(recipes) {
    const searchInput = document.getElementById('recipe-search');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterRecipes(recipes);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterRecipes(recipes);
        });
    }
}

// Filter recipes based on search and category
function filterRecipes(recipes) {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                             recipe.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || recipe.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    renderRecipes(filteredRecipes);
}

// Open recipe modal
function openRecipeModal(recipeId) {
    // In a real app, you would fetch the recipe by ID from your data
    // For this example, we'll use a simple object
    const recipe = {
        id: recipeId,
        title: "Sample Recipe",
        description: "This is a sample recipe description.",
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        steps: ["Step 1", "Step 2", "Step 3"],
        nutrition: {
            calories: 300,
            protein: "15g",
            carbs: "30g",
            fat: "10g",
            fiber: "5g"
        }
    };
    
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            
            <h3>Steps</h3>
            <ol>
                ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h3>Nutrition Information</h3>
            <table>
                <tr>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Fiber</th>
                </tr>
                <tr>
                    <td>${recipe.nutrition.calories}</td>
                    <td>${recipe.nutrition.protein}</td>
                    <td>${recipe.nutrition.carbs}</td>
                    <td>${recipe.nutrition.fat}</td>
                    <td>${recipe.nutrition.fiber}</td>
                </tr>
            </table>
        `;
        
        modal.style.display = 'block';
        
        // Close modal when clicking on X
        document.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Calorie Calculator page
function initCalculatorPage() {
    const calculatorForm = document.getElementById('calculator-form');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateNutrition();
        });
    }
}

// Calculate nutrition values
function calculateNutrition() {
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityFactor = parseFloat(document.getElementById('activity').value);
    
    // Validate inputs
    if (!age || !height || !weight) {
        alert('Please fill in all fields with valid numbers.');
        return;
    }
    
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activityFactor;
    
    // Calculate macronutrients
    const carbsGrams = Math.round((tdee * 0.50) / 4);
    const proteinGrams = Math.round((tdee * 0.20) / 4);
    const fatGrams = Math.round((tdee * 0.30) / 9);
    
    const carbsCalories = carbsGrams * 4;
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    
    // Display results with animation
    animateValue('bmr-value', 0, Math.round(bmr), 1000);
    animateValue('tdee-value', 0, Math.round(tdee), 1000);
    
    setTimeout(() => {
        animateValue('carbs-value', 0, carbsGrams, 800, 'g');
        animateValue('protein-value', 0, proteinGrams, 800, 'g');
        animateValue('fat-value', 0, fatGrams, 800, 'g');
        
        animateValue('carbs-calories', 0, carbsCalories, 800, ' calories');
        animateValue('protein-calories', 0, proteinCalories, 800, ' calories');
        animateValue('fat-calories', 0, fatCalories, 800, ' calories');
        
        // Animate progress bars
        document.getElementById('carbs-bar').style.width = '50%';
        document.getElementById('protein-bar').style.width = '20%';
        document.getElementById('fat-bar').style.width = '30%';
    }, 1000);
    
    // Show results section
    document.getElementById('results').classList.add('active');
}

// Animate value counting
function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        element.innerHTML = current + suffix;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Workout Generator page
function initWorkoutPage() {
    const generateBtn = document.getElementById('generate-workout');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateWorkout();
        });
    }
}

// Generate workout plan
function generateWorkout() {
    const bodyPart = document.getElementById('body-part').value;
    const equipment = document.getElementById('equipment').value;
    
    // Sample workout data
    const workouts = {
        arms: {
            none: [
                { name: "Push-ups", duration: 30, description: "Do as many as you can in 30 seconds" },
                { name: "Tricep Dips", duration: 45, description: "Use a chair or bench for support" },
                { name: "Arm Circles", duration: 60, description: "Forward and backward circles" }
            ],
            dumbbells: [
                { name: "Bicep Curls", duration: 45, description: "3 sets of 12 reps" },
                { name: "Tricep Extensions", duration: 45, description: "3 sets of 12 reps" },
                { name: "Shoulder Press", duration: 45, description: "3 sets of 10 reps" }
            ]
        },
        legs: {
            none: [
                { name: "Squats", duration: 45, description: "3 sets of 15 reps" },
                { name: "Lunges", duration: 60, description: "3 sets of 10 reps per leg" },
                { name: "Calf Raises", duration: 30, description: "3 sets of 20 reps" }
            ],
            dumbbells: [
                { name: "Goblet Squats", duration: 45, description: "3 sets of 12 reps" },
                { name: "Dumbbell Lunges", duration: 60, description: "3 sets of 10 reps per leg" },
                { name: "Romanian Deadlifts", duration: 45, description: "3 sets of 12 reps" }
            ]
        },
        full: {
            none: [
                { name: "Burpees", duration: 45, description: "3 sets of 10 reps" },
                { name: "Mountain Climbers", duration: 60, description: "3 sets of 30 seconds" },
                { name: "Jumping Jacks", duration: 45, description: "3 sets of 30 seconds" }
            ],
            dumbbells: [
                { name: "Dumbbell Thrusters", duration: 45, description: "3 sets of 10 reps" },
                { name: "Renegade Rows", duration: 60, description: "3 sets of 10 reps per side" },
                { name: "Dumbbell Swings", duration: 45, description: "3 sets of 15 reps" }
            ]
        }
    };
    
    // Get random workout based on selection
    const workoutList = workouts[bodyPart][equipment] || workouts['full']['none'];
    const workoutContainer = document.getElementById('workout-container');
    
    if (workoutContainer) {
        workoutContainer.innerHTML = '';
        
        workoutList.forEach((exercise, index) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'exercise-item';
            exerciseElement.innerHTML = `
                <div>
                    <h4 class="testh4">${index + 1}. ${exercise.name}</h4>
                    <p class="testh4">${exercise.description}</p>
                </div>
                <button class="timer-btn" data-duration="${exercise.duration}">Start Timer</button>
            `;
            
            workoutContainer.appendChild(exerciseElement);
        });
        
        // Add event listeners to timer buttons
        document.querySelectorAll('.timer-btn').forEach(button => {
            button.addEventListener('click', function() {
                const duration = parseInt(this.getAttribute('data-duration'));
                startExerciseTimer(duration, this);
            });
        });
    }
}

// Start exercise timer
function startExerciseTimer(duration, button) {
    let timeLeft = duration;
    button.textContent = `${timeLeft}s`;
    button.disabled = true;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        button.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            button.textContent = "Done!";
            
            // Play sound (if available)
            try {
                const audio = new Audio('sounds/complete.mp3');
                audio.play();
            } catch (e) {
                console.log("Sound file not found");
            }
            
            // Re-enable button after a delay
            setTimeout(() => {
                button.textContent = "Start Timer";
                button.disabled = false;
            }, 2000);
        }
    }, 1000);
}

// Mindfulness page
function initMindfulnessPage() {
    const startBreathingBtn = document.getElementById('start-breathing');
    const breathingCircle = document.getElementById('breathing-circle');
    const meditationTimerBtn = document.getElementById('start-meditation');
    const meditationDisplay = document.getElementById('meditation-time');
    const soundButtons = document.querySelectorAll('.sound-btn');
    
    if (startBreathingBtn && breathingCircle) {
        startBreathingBtn.addEventListener('click', function() {
            startBreathingExercise(breathingCircle, this);
        });
    }
    
    if (meditationTimerBtn && meditationDisplay) {
        meditationTimerBtn.addEventListener('click', function() {
            startMeditationTimer(meditationDisplay, this);
        });
    }
    
    // Ambient sounds
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleAmbientSound(this);
        });
    });
    
    // Load completed sessions
    updateSessionCount();
}

// Start breathing exercise
function startBreathingExercise(circle, button) {
    if (circle.classList.contains('breathing-active')) {
        // Stop breathing exercise
        circle.classList.remove('breathing-active');
        button.textContent = 'Start Breathing Exercise';
        circle.textContent = 'Breathe';
    } else {
        // Start breathing exercise
        circle.classList.add('breathing-active');
        button.textContent = 'Stop Breathing Exercise';
        
        let cycle = 0;
        const breathingInterval = setInterval(() => {
            if (!circle.classList.contains('breathing-active')) {
                clearInterval(breathingInterval);
                return;
            }
            
            if (cycle % 2 === 0) {
                circle.textContent = 'Breathe In';
                circle.style.transform = 'scale(1.5)';
                circle.style.backgroundColor = '#0091ffff';
            } else {
                circle.textContent = 'Breathe Out';
                circle.style.transform = 'scale(1)';
                circle.style.backgroundColor = '#E0F0EA';
            }
            
            cycle++;
        }, 4000);
    }
}

// Start meditation timer
function startMeditationTimer(display, button) {
    if (display.classList.contains('timer-active')) {
        // Stop timer
        display.classList.remove('timer-active');
        button.textContent = 'Start Meditation';
        clearInterval(window.meditationInterval);
    } else {
        // Start timer
        display.classList.add('timer-active');
        button.textContent = 'Stop Meditation';
        
        let seconds = 0;
        window.meditationInterval = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            
            display.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }, 1000);
        
        // Save session when stopped
        setTimeout(() => {
            if (display.classList.contains('timer-active')) {
                saveMeditationSession(seconds);
            }
        }, 5000); // Save after 5 seconds to avoid saving very short sessions
    }
}

// Save meditation session
function saveMeditationSession(duration) {
    const sessions = JSON.parse(localStorage.getItem('meditationSessions') || '[]');
    sessions.push({
        date: new Date().toISOString(),
        duration: duration
    });
    
    localStorage.setItem('meditationSessions', JSON.stringify(sessions));
    updateSessionCount();
}

// Update session count display
function updateSessionCount() {
    const sessionCount = document.getElementById('session-count');
    if (sessionCount) {
        const sessions = JSON.parse(localStorage.getItem('meditationSessions') || '[]');
        const thisWeekSessions = sessions.filter(session => {
            const sessionDate = new Date(session.date);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            
            return sessionDate >= oneWeekAgo;
        });
        
        sessionCount.textContent = thisWeekSessions.length;
    }
}

// Toggle ambient sound
function toggleAmbientSound(button) {
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        // Stop sound (implementation would depend on specific sounds)
    } else {
        // Stop all other sounds first
        document.querySelectorAll('.sound-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        // Play sound (implementation would depend on specific sounds)
    }
}

// Contact page
function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    // FAQ accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            
            // Close other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer && ans.classList.contains('active')) {
                    ans.classList.remove('active');
                }
            });
        });
    });
}

// Submit contact form
function submitContactForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Save to localStorage
    const feedback = {
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString()
    };
    
    saveToLocalStorage('feedback', JSON.stringify(feedback));
    
    // Show success message
    alert('Thank you for your feedback! We will get back to you soon.');
    document.getElementById('contact-form').reset();
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Initialize PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}