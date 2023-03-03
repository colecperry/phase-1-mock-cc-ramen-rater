// Fetch ramen data, turn into a json response, set json response equal 
// to ramens variable, and pass ramens variable into a render function

fetch("http://localhost:3000/ramens")
.then (resp => resp.json())
.then (ramens => renderRamens(ramens))

// Create renderRamens function, pass in ramens and call a for each for "ramen,"
// for each ramen create an img tag and set equal to image variable
// set the variable (image)'s source to the json data's response, which equals
// (ramens), and now (ramen) after the forEach iteration
// grab div container with ID of #ramen-menu and append new image variable

const renderRamens = (ramens) => {
    ramens.forEach(ramen => {
        const image = document.createElement('img')
        image.src = ramen.image
        const ramenMenu = document.querySelector('#ramen-menu')
        ramenMenu.appendChild(image)

        image.addEventListener('click', () => renderDetails(ramen))

    })
}
// Starting above, add a "click" event listener to each image, or for each (Ramen)
// we are iterating over, and add (renderDetails) as the callback function 
// Since we are passing in a function renderDetails as the argument instead of 
// the event we are listening for, we have to use an anonymous function to pass in (Ramen)
// Set new variable ramenImage, which we grabbed, equal to our json data ramen.image
// Do the same for name, restaurant, rating, and comment but update innerText

const renderDetails = (ramen) => {
    const ramenImage = document.querySelector(".detail-image")
    ramenImage.src = ramen.image
    const ramenName = document.querySelector(".name")
    ramenName.innerText = ramen.name
    const ramenRestaurant = document.querySelector(".restaurant")
    ramenRestaurant.innerText = ramen.restaurant
    const ramenRating = document.querySelector("#rating-display")
    ramenRating.innerText = ramen.rating
    const ramenComment = document.querySelector("#comment-display")
    ramenComment.innerText = ramen.comment

}
//Grab new-ramen form from HTML and add a submit event listener, pass in (handleNewRamen)
// as the callback function. 

const newRamenForm = document.querySelector("#new-ramen")
newRamenForm.addEventListener('submit', handleNewRamen)

// Create (handleNewRamen) function and pass in the event.
// Since it is a submit event, add e.PreventDefault and invoke it
// Grab the "value" for the form input fields in HTML and assign them to new variables

function handleNewRamen(e) {
    e.preventDefault()
    const newName = document.querySelector("#new-name").value
    const newRestaurant = document.querySelector("#new-restaurant").value
    const newImage = document.querySelector("#new-image").value
    const newRating = document.querySelector("#new-rating").value
    const newComment = document.querySelector("#new-comment").value

// Create new function called newRamen and assign it's variables to our form input variables

let newRamen = {
    name: newName,
    restaurant: newRestaurant,
    image: newImage,
    rating: newRating,
    comment: newComment
}

// Call (renderRamens) function and pass in our (newRamen) object
// Since our (renderRamens) function takes in an array, pass in our (newRamen) object
// into an array

renderRamens([newRamen])

}