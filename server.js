const express = require("express");
const ExcelJS = require("exceljs");
const path = require("path");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., index.html, script.js, style.css)
app.use(express.static(path.join(__dirname, "public")));

// Route for the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Array to store responses
let responses = [];

// Route to record responses
app.post("/record", (req, res) => {
    const { task, response } = req.body;

    // Add the response to the array
    responses.push({ task, response });

    // Save responses to Excel
    saveResponsesToExcel()
        .then(() => {
            console.log("Response saved to Excel.");
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error("Error saving to Excel:", err);
            res.status(500).send("Error saving response.");
        });
});

// Function to save responses to Excel
async function saveResponsesToExcel() {
    const workbook = new ExcelJS.Workbook();

    // Check if the file already exists
    try {
        await workbook.xlsx.readFile("responses.xlsx");
    } catch (err) {
        // If the file doesn't exist, create a new workbook
        console.log("Creating new Excel file.");
    }

    // Get the first worksheet or create it if it doesn't exist
    let worksheet = workbook.getWorksheet("Responses");
    if (!worksheet) {
        worksheet = workbook.addWorksheet("Responses");
        // Add headers
        worksheet.addRow(["Task", "Response"]);
    }

    // Add the new response
    responses.forEach(({ task, response }) => {
        worksheet.addRow([task, response]);
    });

    // Save the workbook to a file
    await workbook.xlsx.writeFile("responses.xlsx");
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});