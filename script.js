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

function findMatchingYears(inputYear) {
    if (inputYear < 1) {
        // This case should ideally be handled by the input type="number" min="1"
        // but good to have a fallback.
        return [];
    }

    const inputYearIsLeap = isLeap(inputYear);
    const inputYearFirstDay = getFirstDayOfYear(inputYear);
    const matchingYears = [];

    // Search for matches in the next 200 years. This range can be adjusted.
    // A common pattern for identical calendars repeats every 28 years,
    // but this is interrupted by years divisible by 100 but not by 400.
    // For simplicity, we'll search a fixed range.
    for (let year = inputYear + 1; year <= inputYear + 200; year++) {
        if (isLeap(year) === inputYearIsLeap && getFirstDayOfYear(year) === inputYearFirstDay) {
            matchingYears.push(year);
        }
    }
    return matchingYears;
}

document.addEventListener('DOMContentLoaded', () => {
    const findButton = document.getElementById('findMatchesButton');
    const yearInput = document.getElementById('yearInput');
    const resultsList = document.getElementById('matchingYearsList');

    if (findButton && yearInput && resultsList) {
        findButton.addEventListener('click', () => {
            resultsList.innerHTML = ''; // Clear previous results

            const year = parseInt(yearInput.value);

            if (isNaN(year) || year < 1) {
                alert('Please enter a valid year (e.g., 2023).');
                yearInput.focus();
                return;
            }

            const matches = findMatchingYears(year);

            if (matches.length > 0) {
                matches.forEach(matchYear => {
                    const listItem = document.createElement('li');
                    listItem.textContent = matchYear;
                    resultsList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = `No matching years found within the next 200 years for ${year}.`;
                resultsList.appendChild(listItem);
            }
        });
    } else {
        console.error('Initialization Error: Required HTML elements (button, input, or results list) not found.');
        alert('Could not initialize the page correctly. Please ensure all HTML elements are present.');
    }
});
