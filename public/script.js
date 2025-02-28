const tasks = [
    "Task 1: Find the contact page.",
    "Task 2: Locate the pricing information.",
    "Task 3: Find the team members section.",
    "Task 4: Locate the privacy policy.",
    "Task 5: Find the blog section.",
    "Task 6: Locate the careers page.",
    "Task 7: Find the FAQ section.",
    "Task 8: Locate the terms and conditions.",
    "Task 9: Find the customer support page.",
    "Task 10: Locate the about us section.",
    "Task 11: Find the newsletter subscription page."
];

let currentTaskIndex = 0;
const taskElement = document.getElementById("task");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");

function displayTask() {
    taskElement.textContent = tasks[currentTaskIndex];
    optionsElement.innerHTML = "";

    // Simulate options (replace with your actual tree structure)
    const options = ["Option 1", "Option 2", "Option 3"];
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            recordResponse(option);
            nextButton.disabled = false;
        });
        optionsElement.appendChild(button);
    });
}

function recordResponse(response) {
    const data = {
        task: tasks[currentTaskIndex],
        response: response
    };

    // Send response to the backend
    fetch("/record", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

nextButton.addEventListener("click", () => {
    currentTaskIndex++;
    if (currentTaskIndex < tasks.length) {
        displayTask();
        nextButton.disabled = true;
    } else {
        alert("Thank you for completing the tree test!");
    }
});

displayTask();