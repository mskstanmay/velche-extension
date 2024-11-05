alert("Content script loaded");

// Function to highlight and sort emails based on the active category and keywords
function highlightAndSortEmailsByCategory(categoryName, keywords) {

    alert(keywords);
    // Select all email rows; adjust the selector if Gmail’s DOM changes
    const emailRows = document.querySelectorAll(".zA");

    // Separate matching and non-matching emails
    const matchingEmails = [];
    const nonMatchingEmails = [];

    emailRows.forEach((email) => {
        const emailText = email.innerText.toLowerCase();
        const isMatch = keywords.some(keyword => emailText.includes(keyword.toLowerCase()));

        if (isMatch) {
            // Highlight matching emails
            email.style.backgroundColor = "#ffefc6"; // Light yellow background
            matchingEmails.push(email); // Add to matching emails array
        } else {
            // Clear any previous highlighting
            email.style.backgroundColor = "";
            nonMatchingEmails.push(email); // Add to non-matching emails array
        }
    });

    // Sort emails: place matching emails at the top of the inbox
    const emailList = emailRows[0].parentNode;
    matchingEmails.forEach(email => emailList.prepend(email));
    nonMatchingEmails.forEach(email => emailList.appendChild(email));
}

// Load the active category and its keywords, then apply filtering
function applyCategoryFilter() {
    chrome.storage.sync.get(["activeCategory", "categories"], (data) => {
        const activeCategory = data.activeCategory;
        const categories = data.categories || {};

        if (activeCategory && categories[activeCategory]) {
            const keywords = categories[activeCategory];
            highlightAndSortEmailsByCategory(activeCategory, keywords);
        }
    });
}

// Apply the category filter when the page loads
applyCategoryFilter();

// Listen for changes to the active category in storage and reapply filtering
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.activeCategory) {
        applyCategoryFilter();
    }
});
