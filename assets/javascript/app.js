// Initial array of movies
var movies = ["Dark Crystal", "The Matrix", "Blade Runner", "Alien", "Star Wars", "Star Trek", "The Fifth Element"];


// Generic function for capturing the movie name from the data-attribute
function alertMovieName() {
    var movieName = $(this).attr("data-name");

    alert(movieName);
}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#movie-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#movie-buttons").append(a);
    }
}


// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding the movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".movie", alertMovieName);

// Calling the renderButtons function to display the intial buttons
renderButtons();