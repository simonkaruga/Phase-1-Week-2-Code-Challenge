document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animal-list');
    const animalDetail = document.getElementById('animal-details');
    console.log('Flatacuties app loaded!');


    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(characters => {
            characters.forEach(animal => renderAnimalName(animal));
        })
        .catch(error => console.error("Error fetching animals:", error));

    
    function renderAnimalName(animal) {
        const nameElement = document.createElement('p');
        nameElement.textContent = animal.name;
        nameElement.style.cursor = "pointer";
        nameElement.addEventListener('click', () => showAnimalDetail(animal));
        animalList.appendChild(nameElement);
    }

    
    function showAnimalDetail(animal) {
        animalDetail.innerHTML = '';

        const nameElement = document.createElement('h2');
        nameElement.textContent = animal.name;

        const imageElement = document.createElement('img');
        imageElement.src = animal.image;
        imageElement.alt = animal.name;
        imageElement.style.width = '300px';

        const votesElement = document.createElement('p');
        votesElement.textContent = `Votes: ${animal.votes}`;

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote for me!';
        voteButton.addEventListener('click', () => {
            animal.votes += 1;
            votesElement.textContent = `Votes: ${animal.votes}`;
        });

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset votes';
        resetButton.addEventListener('click', () => {
            animal.votes = 0;
            votesElement.textContent = `Votes: ${animal.votes}`;
        });

        
        const voteForm = document.createElement('form');
        voteForm.innerHTML = `
            <input type="number" min="1" placeholder="Enter votes" required>
            <button type="submit">Add Votes</button>
        `;

        voteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = voteForm.querySelector('input');
            const addedVotes = parseInt(input.value, 10);
            if (!isNaN(addedVotes) && addedVotes > 0) {
                animal.votes += addedVotes;
                votesElement.textContent = `Votes: ${animal.votes}`;
                input.value = '';
            }
        });

        animalDetail.appendChild(nameElement);
        animalDetail.appendChild(imageElement);
        animalDetail.appendChild(votesElement);
        animalDetail.appendChild(voteButton);
        animalDetail.appendChild(resetButton);
        animalDetail.appendChild(voteForm);
    }
});
