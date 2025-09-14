 Flatacuties
Flatacuties is a mini web application where users can vote for the cutest animals! This project was built as a hands-on coding challenge to practice core frontend skills while interacting with a mock backend API. It serves as a practical example of building a dynamic, interactive user interface from the ground up.

 Features

Animal Gallery: Dynamically displays a list of all available animals, fetched from a server.

Interactive Details: Clicking an animal's name on the list reveals its image and current vote count.

Voting System: Users can add votes with a click. The vote count updates immediately in the UI, simulating real-time feedback.

Vote Reset: Provides a "Reset" button to instantly return an animal's vote count to 0, demonstrating the ability to modify and update data.

Dynamic Additions: A dedicated form allows users to add new animals to the application. Just enter a name and image URL, and the new animal is added to both the UI and the server data.

Server Communication: All animal data is managed through a local JSON server, showcasing essential CRUD (Create, Read, Update, Delete) operations. This approach allows for a realistic simulation of a full-stack application's data flow.

How It Works

Flatacuties is a single-page application built entirely with vanilla JavaScript, HTML, and CSS. The application follows a simple data-driven architecture:

Data Fetching: When the page loads, the application sends a GET request to the local JSON server to retrieve the list of all animals.

DOM Manipulation: The fetched animal data is used to dynamically create and append list items to the sidebar on the left.

Event Handling: An event listener is attached to each animal's name. When a user clicks a name, a function triggers to display the corresponding animal's details on the right side of the page. Event listeners are also used to handle voting, vote resetting, and adding new animals.

Data Updates:

Voting: A PATCH request is sent to the server to increment the vote count for a specific animal.

Resetting: A PATCH request is sent to reset the votes to zero.

Adding: A POST request sends the new animal's data to the server, and the UI is then updated to reflect the change.

Auther:
Simon Karuga
