let lastCombination = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('randomizeButton').addEventListener('click', function() {
        const input = document.getElementById('listInput').value.trim();
        if (input === '') {
            alert('Please enter some items in the list.');
            return;
        }

        let items = input.split('\n').filter(item => item.trim() !== '');
        let tries = 0;

        do {
            shuffleArray(items);
            tries++;
        } while (arraysEqual(lastCombination, items.slice(0, lastCombination.length)) && tries < 100 && items.length > 1);

        lastCombination = items.slice();

        const listElement = document.getElementById('randomizedList');
        listElement.innerHTML = '';

        for (let i = 0; i < items.length; i += 2) {
            const teamMember1 = items[i];
            const teamMember2 = i + 1 < items.length ? items[i + 1] : "No partner";
            let listItem = document.createElement('li');

            if (teamMember2 === "No partner") {
                listItem.textContent = `Team ${Math.floor(i / 2) + 1}: ${teamMember1} has no partner`;
                listItem.classList.add('no-partner');
            } else {
                listItem.textContent = `Team ${Math.floor(i / 2) + 1}: ${teamMember1} and ${teamMember2}`;
            }

            listElement.appendChild(listItem);
        }
    });

    document.getElementById('clearListButton').addEventListener('click', function() {
        document.getElementById('listInput').value = '';
        document.getElementById('randomizedList').innerHTML = '';
        lastCombination = [];
    });

    document.getElementById('addSelectedButton').addEventListener('click', function() {
        const predefinedList = document.getElementById('predefinedList');
        const listInput = document.getElementById('listInput');
        
        const selectedPeople = Array.from(predefinedList.options)
                                    .filter(option => option.selected)
                                    .map(option => option.value);
        
        selectedPeople.forEach(person => {
            if (!listInput.value.includes(person)) {
                listInput.value += (listInput.value ? '\n' : '') + person;
            }
        });
    });

    document.getElementById('exportTxtButton').addEventListener('click', exportRandomizedListToTxt);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
 
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function exportRandomizedListToTxt() {
    const listItems = document.querySelectorAll('#randomizedList li');
    console.log(listItems); // Debug: Check if list items are correctly selected
    const listText = Array.from(listItems).map(li => li.textContent).join('\n');

    // Debugging: Log the text content to be exported
    console.log('Exporting the following content:', listText);

    const blob = new Blob([listText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'randomizedList.txt';
    // Append to body to ensure visibility in DOM (required in some browsers)
    document.body.appendChild(a);
    a.style.display = 'none'; // Hide the element
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
// listtest

