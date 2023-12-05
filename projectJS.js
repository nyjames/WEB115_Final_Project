let name, email, goal; 

// Define variables

function submitForm() {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    goal = document.getElementById("goal").value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    viewMealPlans(); // Call viewMealPlans after validating email
}

function clear() {
    // Clear the content of the planner
    mealPlansPage.document.write(`
    <html>
        <head>
            <title>Meal Plans</title>
            <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body>

        <div id="banner">
            <img id="banner-img" src="Screenshot 2023-11-28 002357.png" alt="canva_banner">
            <p1 class="banner-text"></p1>
        </div>


            <h2 id="main_page_title">${name}'s Meal Plan</h2>
            <p id="main_page_title">Goal for the week: ${goal}</p>
            <h3 id="main_page_title">Meal Plan for the Week</h3>
            
            <script>
                    // Dynamically create buttons
                    let clearButton = document.createElement("button");
                    clearButton.id = "clear";
                    clearButton.innerText = "Clear Planner";
                    clearButton.onclick = function() {
                        clear();
                    };

                    let printButton = document.createElement("button");
                    printButton.id = "print";
                    printButton.innerText = "Print Planner";
                    printButton.onclick = function() {
                        print();
                    };

                    let downloadButton = document.createElement("button");
                    downloadButton.id = "download";
                    downloadButton.innerText = "Download Planner";
                    downloadButton.onclick = function() {
                        download();
                    };

                    // Append buttons to the body
                    document.body.appendChild(clearButton);
                    document.body.appendChild(printButton);
                    document.body.appendChild(downloadButton);
                </script>
            </body>
        </html>`);
}

function print() {
    // Print the content of the planner
    window.print();
}

function download() {
    // Download the content of the planner as a text file
    let plannerContent = document.getElementById("meal_plans_list").innerText;
    
    // Create a blob with the text content
    let blob = new Blob([plannerContent], { type: "text/plain" });
    
    // Create a download link
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meal_planner.txt";

    // Append the link to the document and trigger the click event
    document.body.appendChild(link);
    link.click();
}

function isValidEmail(email) {
// validate emails
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function viewMealPlans() {
    // Define an array of days of the week
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // store meal inputs for each day
    const mealInputs = {};

    // Loop through each day and prompt the user for meal inputs
    for (const day of daysOfWeek) {
        const breakfast = prompt(`Enter Breakfast for ${day}:`);
        const snack1 = prompt(`Enter Snack 1 for ${day}:`);
        const lunch = prompt(`Enter Lunch for ${day}:`);
        const snack2 = prompt(`Enter Snack 2 for ${day}:`);
        const dinner = prompt(`Enter Dinner for ${day}:`);

        // Store the meal inputs for the current day
        mealInputs[day] = { breakfast, snack1, lunch, snack2, dinner };
    }

        // create new webpage and write html
    let mealPlansPage = window.open('meal_plans.html', '_blank');

    mealPlansPage.document.write(`
        <html>
            <head>
                <title>Meal Plans</title>
                <link rel="stylesheet" type="text/css" href="styles.css">
            </head>
            <body>

            <div id="banner">
                <img id="banner-img" src="Screenshot 2023-11-28 002357.png" alt="canva_banner">
                <p1 class="banner-text"></p1>
            </div>


                <h2 id="main_page_title">${name}'s Meal Plan</h2>
                <p id="main_page_title">Goal for the week: ${goal}</p>
                <h3 id="main_page_title">Meal Plan for the Week</h3>
                <ul id="meal_plans_list">
                    <!-- Loop through each day and add the meal inputs to the content -->
                    ${daysOfWeek.map(day => {
                        const { breakfast, snack1, lunch, snack2, dinner } = mealInputs[day];
                        return `<li class="meal_plans">${day}: ${breakfast}, ${snack1}, ${lunch}, ${snack2}, ${dinner}</li>`;
                    }).join('')}
                </ul>

                <script>
                    // Dynamically create buttons
                    let clearButton = document.createElement("button");
                    clearButton.id = "clear";
                    clearButton.innerText = "Clear Planner";
                    clearButton.onclick = function() {
                        clear();
                    };

                    let printButton = document.createElement("button");
                    printButton.id = "print";
                    printButton.innerText = "Print Planner";
                    printButton.onclick = function() {
                        print();
                    };

                    let downloadButton = document.createElement("button");
                    downloadButton.id = "download";
                    downloadButton.innerText = "Download Planner";
                    downloadButton.onclick = function() {
                        download();
                    };

                    // Append buttons to the body
                    document.body.appendChild(clearButton);
                    document.body.appendChild(printButton);
                    document.body.appendChild(downloadButton);
                </script>
            </body>
        </html>
    `);

    mealPlansPage.document.close();
}