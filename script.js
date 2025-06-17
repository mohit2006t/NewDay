function isLeap(year) {
    // Leap years are divisible by 4,
    // except for years divisible by 100 but not by 400.
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getFirstDayOfYear(year) {
    // Returns the day of the week for January 1st of the given year (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const d = new Date(year, 0, 1);
    return d.getDay();
}

function findMatchingYears(inputYear, searchRange) { // Added searchRange parameter
    if (inputYear < 1) {
        return [];
    }

    const inputYearIsLeap = isLeap(inputYear);
    const inputYearFirstDay = getFirstDayOfYear(inputYear);
    const matchingYears = [];

    // Use the provided searchRange
    for (let year = inputYear + 1; year <= inputYear + searchRange; year++) {
        if (isLeap(year) === inputYearIsLeap && getFirstDayOfYear(year) === inputYearFirstDay) {
            matchingYears.push(year);
        }
    }
    return matchingYears;
}

document.addEventListener('DOMContentLoaded', () => {
    const findButton = document.getElementById('findMatchesButton');
    const yearInput = document.getElementById('yearInput');
    const rangeInput = document.getElementById('rangeInput'); // Get the new range input
    const resultsList = document.getElementById('matchingYearsList');

    if (findButton && yearInput && rangeInput && resultsList) { // Added rangeInput to the check
        findButton.addEventListener('click', () => {
            resultsList.innerHTML = '';

            const year = parseInt(yearInput.value);
            let searchRange = parseInt(rangeInput.value); // Get the search range value

            if (isNaN(year) || year < 1) {
                alert('Please enter a valid year (e.g., 2023).');
                yearInput.focus();
                return;
            }

            // Validate searchRange, default to 200 if invalid or empty
            if (isNaN(searchRange) || searchRange < 1) {
                searchRange = 200;
                rangeInput.value = "200"; // Optionally update the input field to show the default used
                // alert('Search range is invalid. Defaulting to 200 years.'); // Optional: notify user
            }

            // Pass searchRange to findMatchingYears
            const matches = findMatchingYears(year, searchRange);

            if (matches.length > 0) {
                matches.forEach(matchYear => {
                    const listItem = document.createElement('li');
                    listItem.textContent = matchYear;
                    resultsList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = `No matching years found for ${year} within the next ${searchRange} years.`;
                resultsList.appendChild(listItem);
            }
        });
    } else {
        console.error('Initialization Error: Required HTML elements not found.');
        alert('Could not initialize the page correctly. Please ensure all HTML elements are present.');
    }
});
