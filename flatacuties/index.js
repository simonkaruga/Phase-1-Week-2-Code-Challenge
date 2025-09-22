document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animal-list');
    const animalDetail = document.getElementById('animal-details');
    const baseURL = 'http://localhost:3000/characters';
    console.log('Flatacuties app loaded!');

    fetch(baseURL)
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
            updateVotes(animal, animal.votes + 1, votesElement);
        });

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset votes';
        resetButton.addEventListener('click', () => {
            updateVotes(animal, 0, votesElement);
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
                updateVotes(animal, animal.votes + addedVotes, votesElement);
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

    function updateVotes(animal, newVotes, votesElement) {
        fetch(`${baseURL}/${animal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: newVotes })
        })
        .then(res => res.json())
        .then(updatedAnimal => {
            animal.votes = updatedAnimal.votes;
            votesElement.textContent = `Votes: ${updatedAnimal.votes}`;
        })
        .catch(err => console.error("Error updating votes:", err));
    }

 
    const addAnimalForm = document.getElementById('add-animal-form');

    addAnimalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('animal-name');
        const imageInput = document.getElementById('animal-image');

        const newAnimal = {
            name: nameInput.value.trim(),
            image: imageInput.value.trim(),
            votes: 0
        };

        fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnimal)
        })
        .then(res => res.json())
        .then(createdAnimal => {
        
            renderAnimalName(createdAnimal);
           
            showAnimalDetail(createdAnimal);
           
            addAnimalForm.reset();
        })
        .catch(err => console.error("Error adding new animal:", err));
    });
});
