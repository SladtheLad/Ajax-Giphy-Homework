// Initial array of movies
var movies = ["Dark Crystal", "The Matrix", "Blade Runner", "Alien", "Star Wars", "Star Trek", "The Fifth Element"];
console.log(movies);



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
    var movieInput = $("#movie-input").val().trim();

    // Adding the movie from the textbox to our array
    movies.push(movieInput);
    console.log(movies);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding click event listen listener to all buttons
$("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    var movie = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .done(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var movieDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var movieImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                movieImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                movieDiv.append(p);
                movieDiv.append(movieImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(movieDiv);
            }
        });
});

// Calling the renderButtons function to display the intial buttons
renderButtons();