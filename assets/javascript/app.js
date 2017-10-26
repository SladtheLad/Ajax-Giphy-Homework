// Initial array of movies
var movies = ["The Dark Crystal", "The Matrix", "Blade Runner", "Alien", "Star Wars", "Star Trek", "The Fifth Element", "Snowpiercer", "2001: A Space Oddyssey"];
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
        a.attr("data-movie-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#movie-buttons").append(a);

    }
};


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
// Event listener for all button elements
$(document).on("click", "button", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var movie = $(this).attr("data-movie-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .done(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var movieImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    movieImage.attr("src", results[i].images.fixed_height_still.url);
                    movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                    movieImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(movieImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});

$(document).on("click", "img", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
// Calling the renderButtons function to display the intial buttons
renderButtons();