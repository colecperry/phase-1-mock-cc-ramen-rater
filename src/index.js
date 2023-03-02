const getRamen = async () => {
    const response = await fetch('http://localhost:3000/ramens');
    const data = await response.json();
    return data;
}

// function getRamen() {
//     let data = fetch('http://localhost:3000/ramens')
//     .then(res => res.json()).catch(err => console.log(err));
//     console.log(data);
//     return data;
// }

function getOneRamen(_id){
    let data = fetch('http://localhost:3000/ramens/' + _id)
    .then(res => res.json()).catch(err => console.log(err));
    console.log(data);
    return data;
}


const renderOneRamen = async (_id) => {
    const ramen = await getOneRamen(_id);
    
    const ramenDetail = document.getElementById('ramen-detail');
        const imgElement = ramenDetail.querySelector('img');
        const ramenName = ramenDetail.querySelector('h2');
        const ramenRestaurant = ramenDetail.querySelector('h3');
        imgElement.setAttribute('src', ramen.image);
        ramenName.textContent = ramen.name;
        ramenRestaurant.textContent = ramen.restaurant;

    const ramenRating = document.getElementById('rating-display');
    const comment = document.getElementById('comment-display');

    ramenRating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}


const renderRamen = async () => {
    const data = await getRamen();
    const ramenMenu = document.getElementById('ramen-menu');
    data.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.setAttribute('src', ramen.image);
        ramenImage.setAttribute('alt', ramen.name);
        ramenImage.setAttribute('id', ramen.id);
        ramenImage.addEventListener("click", () => {
            renderOneRamen(ramen.id);
        })
        // <img src='./assets/....' alt='name..' />
        ramenMenu.appendChild(ramenImage);
    })
}

// POST REQUEST FOR ALL FORM INPUT
// First get the form element by Id and submitBtn element by Id:
const form = document.getElementById("new-ramen");

// Also get all the form elements except for the input button element
const formElements = form.querySelectorAll("textarea, input:not(#submit-ramen)")

// Create an empty formObj to store all of the form data input
let formObj = {};

// Create onchange handler function which will capture all the form input data as it's being entered
formElements.forEach((element) => {
    element.addEventListener("change", (e) => {
        formObj[e.target.name] = e.target.value;
    });
});

const submitBtn = document.getElementById('submit-ramen');

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
    }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});




renderRamen();

