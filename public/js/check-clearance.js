document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById("search-box");

    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(searchForm);
            const searchName = formData.get('search_name');
            
            try {
                if (searchName) {
                    const response = await fetch(`/search-cases-employee/${searchName}`);
                    const responseLupon = await fetch(`/search-cases-employeeLupon/${searchName}`);

                    if (!response.ok) {
                        throw new Error('Network response for Employee was not ok');
                    }
                
                    if (!responseLupon.ok) {
                        throw new Error('Network response for Lupon was not ok');
                    }
                
                    const result = await response.json();
                    const resultLupon = await responseLupon.json();

                    if (result.results.length > 0 && resultLupon.results.length > 0) {
                        // Display both sets of results
                        displayResults(result.results);
                        displayResultsLupon(resultLupon.results);
                    } else if (result.results.length > 0) {
                        // Display only Employee results
                        displayResults(result.results);
                    } else if (resultLupon.results.length > 0) {
                        // Display only Lupon results
                        displayResultsLupon(resultLupon.results);
                    } else {
                        displayNoResult();
                    }
                } else {
                    clearResults(); // Clear results if searchName is empty
                    searchBox.placeholder = "Search Name"; // Reset placeholder
                }
            } catch (error) {
                console.error('There was a problem with the search operation:', error);
            }
        });
    }

    // Existing code for other functionalities (displayResults, clearResults, etc.) remains the same
});

function displayNoResult() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results
    
    const listItem = document.createElement("li");
    listItem.className = "result-item";
    listItem.textContent = "No results found";
    

    // Create an anchor element for the link
    const link = document.createElement("a");
    link.href = "/employee-input-page";
    link.textContent = "Continue to Certificate Generation?";

    // Append the anchor element to the list item
    listItem.appendChild(link);

    resultsContainer.appendChild(listItem);
}

function displayResults(results) {
    const searchBox = document.getElementById("search-box");
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length > 0) {
        const listElement = document.createElement("ul");
        listElement.className = "results-list";

        results.forEach(result => {
            const { _id, ReporteeInfo } = result;

            const listItem = document.createElement("li");
            listItem.className = "result-item";

            const linkElement = document.createElement("a");
            linkElement.href = `/employee-onClick-print/${_id}`; // Update this path as needed
            linkElement.textContent = `${ReporteeInfo.FirstName} ${ReporteeInfo.MiddleInitial ? `${ReporteeInfo.MiddleInitial}. ` : ''}${ReporteeInfo.LastName}`;

            // Add click event listener to the link element
            linkElement.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent default link behavior (navigating away)
                searchBox.value = linkElement.textContent; // Set search box value to clicked item
                searchBox.placeholder = linkElement.textContent; // Update placeholder
                clearResults(); // Clear search results
                window.location.href = linkElement.href; // Navigate to the specified URL
            });

            listItem.appendChild(linkElement);
            listElement.appendChild(listItem);
        });

        resultsContainer.appendChild(listElement);
    } else {
        const listItem = document.createElement("li");
        listItem.className = "result-item";
        listItem.textContent = "No results found";
        resultsContainer.appendChild(listItem);
    }
}

function displayResultsLupon(results) {
    const searchBox = document.getElementById("search-box");
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length > 0) {
        const listElement = document.createElement("ul");
        listElement.className = "results-list";

        results.forEach(result => {
            const { _id, RespondentInfo } = result;

            const listItem = document.createElement("li");
            listItem.className = "result-item";

            const linkElement = document.createElement("a");
            linkElement.href = `/employee-onClick-printLupon/${_id}`; // Update this path as needed
            linkElement.textContent = `${RespondentInfo.FirstName} ${RespondentInfo.MiddleInitial ? `${RespondentInfo.MiddleInitial}. ` : ''}${RespondentInfo.LastName}`;

            // Add click event listener to the link element
            linkElement.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent default link behavior (navigating away)
                searchBox.value = linkElement.textContent; // Set search box value to clicked item
                searchBox.placeholder = linkElement.textContent; // Update placeholder
                clearResults(); // Clear search results
                window.location.href = linkElement.href; // Navigate to the specified URL
            });

            listItem.appendChild(linkElement);
            listElement.appendChild(listItem);
        });

        resultsContainer.appendChild(listElement);
    } else {
        const listItem = document.createElement("li");
        listItem.className = "result-item";
        listItem.textContent = "No results found."; //add href to /employee-input-page but the href is wrap in Continue generation 
        resultsContainer.appendChild(listItem);
    }
}


function clearResults() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results
}

