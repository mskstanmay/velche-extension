// DOM Elements
const saveButton = document.getElementById("saveRule");
const categoryInput = document.getElementById("category");
const categoryList = document.getElementById("categoryList");
const statusText = document.getElementById("status");

// Default categories with keywords
const defaultCategories = {
    "Social Media": ["Facebook", "Twitter", "Instagram", "LinkedIn", "X"],
    Inbox: ["Important", "Invoice", "Report", "Project"],
    Spam: ["Buy now", "Free", "Congratulations", "Earn money"],
};

// Save Rule function to store entries
function saveRule() {
    const categoryName = categoryInput.value.trim();

    if (!categoryName) {
        showStatusMessage("Please enter a category name.");
        return;
    }

    chrome.storage.sync.get("categories", (data) => {
        let categories = data.categories || {};

        if (categories[categoryName]) {
            showStatusMessage("Category already exists.");
            return;
        }

        // Add new category
        categories[categoryName] = []; // You may add keywords or leave it empty
        chrome.storage.sync.set({ categories: categories }, () => {
            showStatusMessage("Category saved!");
            loadCategories(); // Immediately reload categories after saving
            categoryInput.value = ""; // Clear input field
        });
    });
}


// Initialize default categories on first install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get("categories", (data) => {
        if (!data.categories) {
            chrome.storage.sync.set({ categories: defaultCategories }, () => {
                console.log("Default categories set on install.");
            });
        }
    });
});

// Load categories when the popup opens
document.addEventListener("DOMContentLoaded", loadCategories);

//VAerifying storage initilisation
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("categories", (data) => {
        if (!data.categories) {
            chrome.storage.sync.set({ categories: defaultCategories }, loadCategories);
        } else {
            loadCategories();
        }
    });
});


// Save a new category when clicking "Save Rule"
saveButton.addEventListener("click", () => {
    const category = categoryInput.value.trim();
    if (category) {
        chrome.storage.sync.get("categories", (data) => {
            const categories = data.categories || {};

            if (!categories[category]) {
                categories[category] = []; // Initialize new category with an empty array
                chrome.storage.sync.set({ categories: categories }, () => {
                    showStatusMessage("Category saved!");
                    loadCategories();
                    categoryInput.value = "";
                });
            } else {
                showStatusMessage("Category already exists.");
            }
        });
    } else {
        showStatusMessage("Please enter a category.");
    }
});

function loadCategories() {
    chrome.storage.sync.get("categories", (data) => {
        const categories = data.categories || {};
        categoryList.innerHTML = ""; // Clear the list

        Object.keys(categories).forEach((categoryName) => {
            const listItem = document.createElement("li");
            listItem.textContent = categoryName;

            // Activate button
            const activateButton = document.createElement("button");
            activateButton.textContent = categories[categoryName].isActive ? "Deactivate" : "Activate";
            activateButton.style.backgroundColor = categories[categoryName].isActive ? "green" : "red";
            activateButton.style.color = "white";
            activateButton.addEventListener("click", () => toggleCategoryActivation(categoryName));

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteCategory(categoryName));

            listItem.appendChild(activateButton);
            listItem.appendChild(deleteButton);
            categoryList.appendChild(listItem);
        });
    });
}

// Toggle the activation state of a category
function toggleCategoryActivation(categoryName) {
    chrome.storage.sync.get("categories", (data) => {
        const categories = data.categories || {};
        if (categories[categoryName]) {
            // Toggle the isActive status
            categories[categoryName].isActive = !categories[categoryName].isActive;

            // Call activateCategory if the category is activated
            if (categories[categoryName].isActive) {
                activateCategory(categoryName); // Activate the category
            } else {
                // Optionally, if you want to reset the active category when deactivating:
                chrome.storage.sync.set({ activeCategory: null }, () => {
                    showStatusMessage(`Category "${categoryName}" deactivated.`);
                });
            }

            chrome.storage.sync.set({ categories }, loadCategories); // Refresh the list after toggling
        }
    });
}



// Activate a category
function activateCategory(category) {
    chrome.storage.sync.set({ activeCategory: category }, () => {
        showStatusMessage(`Category "${category}" activated.`);
        console.log(`Activated category: ${category}`);
    });
}

// Delete a category
function deleteCategory(category) {
    chrome.storage.sync.get("categories", (data) => {
        const categories = data.categories || {};
        delete categories[category]; // Remove the category

        chrome.storage.sync.set({ categories: categories }, () => {
            showStatusMessage(`Category "${category}" deleted.`);
            loadCategories();
        });
    });
}

// Show status message and clear it after a few seconds
function showStatusMessage(message) {
    statusText.innerText = message;
    setTimeout(() => {
        statusText.innerText = "";
    }, 2000);
}

// Trigger clearStatusMessage after any status update
saveButton.addEventListener("click", () => showStatusMessage("Category saved!"));

// Listen for button clicks in the category list
categoryList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const listItem = event.target.closest("li");
        const categoryName = listItem ? listItem.textContent.replace("ActivateDelete", "").trim() : "";
        
        if (event.target.textContent === "Activate") {
            showStatusMessage(`Category "${categoryName}" activated.`);
        } else if (event.target.textContent === "Delete") {
            showStatusMessage(`Category "${categoryName}" deleted.`);
        }
    }
});
