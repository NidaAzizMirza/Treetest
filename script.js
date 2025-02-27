const tree = {
    "Home": {
        "About Us": {
            "Team": {},
            "Mission": {}
        },
        "Services": {
            "Web Design": {},
            "SEO": {}
        },
        "Contact": {}
    }
};

let currentPath = [];
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const backButton = document.getElementById("back-button");

function renderTree() {
    let currentNode = tree;
    for (const node of currentPath) {
        currentNode = currentNode[node];
    }

    questionElement.textContent = currentPath.length === 0 ? "Start" : currentPath.join(" > ");
    optionsElement.innerHTML = "";

    Object.keys(currentNode).forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            currentPath.push(option);
            renderTree();
            backButton.disabled = false;
        });
        optionsElement.appendChild(button);
    });
}

backButton.addEventListener("click", () => {
    if (currentPath.length > 0) {
        currentPath.pop();
        renderTree();
        backButton.disabled = currentPath.length === 0;
    }
});

renderTree();