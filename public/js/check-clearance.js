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

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    console.log(result); 

                    displayResults(result.results);
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


function clearResults() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results
}

