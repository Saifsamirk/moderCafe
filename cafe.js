const container = document.getElementById('container');
const form = document.getElementById('form');
const day = document.getElementById('select-day');
const hour = document.getElementById('select-hour');
const number = document.getElementById('select-number');
const fullName = document.getElementById('name');
const phoneNum = document.getElementById('phone');
const closeBtn = document.getElementById('close');
const receiptContainer = document.getElementById('receipt-container');
const mealsWrapper = document.getElementById('meals-wrapper');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

let commentsData = [];

let orders = [];

let featuredMeals = [];

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`June 01 ${currentYear} 
00:00:00`);

// Fetch meals from the api
// async function getMeals(index) {
//     const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
//     const data = await res.json();

//     featuredMeals.push(data.meals);
// }


// Fetch featured meals 
async function getMeals() {
    for (let i = 0; i < 3; i++) {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await res.json();

        featuredMeals.push(data.meals);
    }

    for (i = 0; i < 3; i++) {

        featuredMeals[i].forEach(meal => {

            // create the featured meal element
            const mealEl = document.createElement('div');

            // add the class
            mealEl.classList.add('featured-meal-container');

            //Add meal to DOM
            mealEl.innerHTML = `
        <div>${meal.strArea}</div>
        <div id="meal-description" class="meal-description">
            <img src="${meal.strMealThumb}" />
            <div id="price" class="price">$${Math.abs((meal.idMeal) % 1000 - 1000).toFixed(2)}</div>
            <small>${meal.strMeal}</small>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Numquam odit officiis aspernatur rerum?
            </p>
        </div>
        `;

            mealsWrapper.appendChild(mealEl);

        });
    }
}
getMeals();

// Fetch Posts from the api
async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    data.forEach((post, index) => {
        if (index < 10) {
            postsData.push(post);
            console.log(postsData);

            const postEl = document.createElement('div');
            postEl.classList.add('post-container');

            postEl.innerHTML = `
            <div id="post-overlay" class="post-overlay">
                <span class="post-title">${post.title}</span>
            </div>
            <div id="post-number" class="post-number">${post.id}</div>
            <div id="post" class="post">${post.body}</div>
            `
            container.appendChild(postEl);
        }
    })
}

//Generate random id 
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Submit the order 
function submitOrder(e) {
    e.preventDefault();

    if (day.value.trim() === '' || hour.value.trim() === ''
        || number.value.trim() === '' || fullName.value.trim() === ''
        || phoneNum.value.trim() === '') {
        alert('Please Complete the Form')
    } else {
        const order = {
            id: generateID(),
            day: day.value,
            hour: +hour.value,
            number: +number.value,
            fullName: fullName.value,
            phoneNum: phoneNum.value,
        };

        orders.push(order);

        receiptContainer.classList.add('show');

        addOrderDOM(order);

        // updateSum();

        // updateLocalStorage();

        day.value = "";
        hour.value = "";
        number.value = "";
        fullName.value = "";
        phoneNum.value = "";

    }
}

//Add order to DOM
function addOrderDOM(order) {

    //Create the receipt 
    const receipt = document.createElement('div');

    //Add class on value 
    receipt.classList.add('receipt');

    receipt.innerHTML = `
    <span class="tag">Reserved</span>
    <h2>Receipt</h2>
    <div class="receipt-number"><span>Reciept no. :</span> ${order.id}</div>
    <div class="receipt-name"><span>Full Name : </span>${order.fullName}</div>
    <div class="receipt-day"><span>Day :</span> ${order.day}</div>
    <div class="receipt-hour"><span>Time :</span> ${order.hour}.00 PM</div>
    <div class="receipt-people"><span>Number of People :</span> ${order.number}</div>
    `

    receiptContainer.appendChild(receipt);

    receiptContainer.style.display = 'flex';


    // Close the reciept window
    setTimeout(() => {
        receiptContainer.classList.remove('show');
        receiptContainer.style.display = 'none';
    }, 3000);
}

form.addEventListener('submit', submitOrder);


//Set background year
year.innerText = currentYear;


//Update countdown time
function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    //Add values to DOM
    days.innerText = d;
    hours.innerText = h < 10 ? `0${h}` : h;
    minutes.innerText = m < 10 ? `0${m}` : m;
    seconds.innerText = s < 10 ? `0${s}` : s;
}

//Show spinner before countdown
setTimeout(() => {
    loading.remove();
    countdown.style.display = 'flex';
}, 1000);


//Run every second
setInterval(updateCountdown, 1000);
