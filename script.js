function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getFirstDayOfYear(year) {
    const d = new Date(year, 0, 1);
    return d.getDay();
}

function findMatchingYears(inputYear, searchRange) {
    if (inputYear < 1) {
        return [];
    }

    const inputYearIsLeap = isLeap(inputYear);
    const inputYearFirstDay = getFirstDayOfYear(inputYear);
    const matchingYears = [];

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
    const rangeInput = document.getElementById('rangeInput');
    const resultsList = document.getElementById('matchingYearsList');

    if (findButton && yearInput && rangeInput && resultsList) {
        findButton.addEventListener('click', () => {
            resultsList.innerHTML = '';

            const year = parseInt(yearInput.value);
            let searchRange = parseInt(rangeInput.value);

            if (isNaN(year) || year < 1) {
                alert('Please enter a valid year (e.g., 2023).');
                yearInput.focus();
                return;
            }

            if (isNaN(searchRange) || searchRange < 1) {
                searchRange = 200;
                rangeInput.value = "200";
            }

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
        console.error('Initialization Error: Required HTML elements (button, input, range input, or results list) not found.');
        alert('Could not initialize the page correctly. Please ensure all HTML elements are present.');
    }
});
