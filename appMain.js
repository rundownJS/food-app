import * as SECRET from './secretData.js'

const API_KEY = SECRET.API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

//usign the user prefrence fetch data 
const fetchingRecepies = async () =>{
    const finalCuisines = CUISINES.join()
    const finalDiets = DIETS.join()
    const finalIntolerances = INTOLERANCES.join()

    const SEARCH_DATA = `type=${TYPE_OF_DISH}&cuisine=${finalCuisines}${finalDiets != 'No Diet' ? `&diet=${finalDiets}` : ''}${finalIntolerances != 'No Intolerances' ? `&intolerances=${finalIntolerances}` : ''}`

    //console.log(SEARCH_DATA)
    //console.log(TYPE_OF_DISH, finalCuisines, finalDiets, finalIntolerances)

    const request = await fetch(`${BASE_URL}/complexSearch?apiKey=${API_KEY}&${SEARCH_DATA}&number=100&instructionsRequired=true&addRecipeNutrition=true`)
    const response = await request.json()

    return response.results
}
//fetchingRecepies()


//variable for progress bar
let segment = 0
//API REQUEST VARIABLES
let TYPE_OF_DISH = ''
let CUISINES = []
let DIETS = []
let INTOLERANCES = []

//user picking the type of dish, only one possible
const initialFunction = () =>{
    const content = document.querySelector(".content")
    content.innerHTML = `
    <span class="section-title">What recipe are you looking for?</span>

    <span class="small-text">(you can only choose one)</span>

    <div class="dishes-wrapper">
        <div  class="each-dish">
            <img src="./images/main-course.webp"/>
            <span>Main Course</span>
        </div>
        <div  class="each-dish">
            <img src="./images/side dish.jpg"/>
            <span>Side Dish</span>
        </div>
        <div  class="each-dish">
            <img src="./images/dessert.jpeg"/>
            <span>Dessert</span>
        </div>
        <div class="each-dish">
            <img src="./images/appetizer.jpg"/>
            <span>Appetizer</span>
        </div>
        <div class="each-dish">
            <img src="./images/salad.webp"/>
            <span>Salad</span>
        </div>
        <div class="each-dish">
            <img src="./images/bread.jpg"/>
            <span>Bread</span>
        </div>
        <div class="each-dish">
            <img src="./images/breakfast.jpg"/>
            <span>Breakfast</span>
        </div>
        <div class="each-dish">
            <img src="./images/soup.jpg"/>
            <span>Soup</span>
        </div>
        <div class="each-dish">
            <img src="./images/finger food.webp"/>
            <span>Fingerfood</span>
        </div>
        <div class="each-dish">
            <img src="./images/snack.jpg"/>
            <span>Snack</span>
        </div>
    </div>

    <div class="buttons">
        <button class="next">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
        </button>
    </div>
    `
    const nextBtn = document.querySelector(".next")

    const eachDishElement = document.querySelectorAll(".each-dish")
    eachDishElement.forEach((el, idx) =>{
        const elementSpan = document.querySelectorAll(".each-dish > span")

        if(TYPE_OF_DISH == elementSpan[idx].textContent.toLowerCase()){
            el.classList.add("selected")

            //add event listener going forward
            nextBtn.classList.add("active")
            nextBtn.addEventListener("click", cuisineSection)
        }

        el.addEventListener("click", ()=>{
            eachDishElement.forEach((el) => el.classList.remove("selected"))

            el.classList.add("selected")

            TYPE_OF_DISH = elementSpan[idx].textContent.toLowerCase()

            nextBtn.classList.add("active")
        })
    })

    nextBtn.addEventListener("click", () =>{
        if(nextBtn.classList.contains("active")){
            cuisineSection()
        }
    })

    segment = 0
    const allStepsEl = document.querySelectorAll(".step > div")
    const progressBarEl = document.querySelector(".progress-bar-active")

    progressBarEl.style.width = `${segment * 25}%`
    for(let i = 0; i < allStepsEl.length; i++){
        if(i == segment){
            allStepsEl[segment].classList.add("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }else if(i < segment){
            allStepsEl[i].classList.add("current")
            allStepsEl[i].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            `
        }else{
            allStepsEl[i].classList.remove("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }
    }
}

//cuisine segment user can select multiple and push them into the array
const cuisineSection = () =>{ 
    const content = document.querySelector(".content")
    content.innerHTML = `
    <span class="section-title">What cuisine/s should the recipe be from?</span>
    <span class="small-text">(choose as many as you want)</span>

    <div class="dishes-wrapper">
        <div class="each-dish">
            <img src="./images/african.jpg" alt="">
            <span>African</span>
        </div>
        <div class="each-dish">
            <img src="./images/chinese.jpeg" alt="">
            <span>Chinese</span>
        </div>
        <div class="each-dish">
            <img src="./images/caribbean.jpg" alt="">
            <span>Caribbean</span>
        </div>
        <div class="each-dish">
            <img src="./images/east europe.jpg" alt="">
            <span>Eastern European</span>
        </div>
        <div class="each-dish">
            <img src="./images/greek.webp" alt="">
            <span>Greek</span>
        </div>
        <div class="each-dish">
            <img src="./images/mediter.png" alt="">
            <span>Mediterranean</span>
        </div>
        <div class="each-dish">
            <img src="./images/mexican.jpg" alt="">
            <span>Mexican</span>
        </div>
        <div class="each-dish">
            <img src="./images/middle eastern.png" alt="">
            <span>Middle Eastern</span>
        </div>
        <div class="each-dish">
            <img src="./images/thai.jpg" alt="">
            <span>Thai</span>
        </div>
        <div class="each-dish">
            <img src="./images/indian.jpg" alt="">
            <span>Indian</span>
        </div>
        <div class="each-dish">
            <img src="./images/west europe.jpg" alt="">
            <span>European</span>
        </div>
        <div class="each-dish">
            <img src="./images/italian.jpg" alt="">
            <span>Italian</span>
        </div>
        <div class="each-dish">
            <img src="./images/latin america.jpg" alt="">
            <span>Latin American</span>
        </div>
    </div>

    <div class="buttons">

        <button class="prev">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
            <span>Prev</span>
        </button>

        <button class="next">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
        </button>

    </div>
    `

    segment = 1
    const allStepsEl = document.querySelectorAll(".step > div")
    const progressBarEl = document.querySelector(".progress-bar-active")

    progressBarEl.style.width = `${segment * 25}%`
    for(let i = 0; i < allStepsEl.length; i++){
        if(i == segment){
            allStepsEl[segment].classList.add("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }else if(i < segment){
            allStepsEl[i].classList.add("current")
            allStepsEl[i].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            `
        }else{
            allStepsEl[i].classList.remove("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }
    }

    const nextBtn = document.querySelector(".next")
    const prevBtn = document.querySelector(".prev")
    const elementSpan = document.querySelectorAll(".each-dish > span")

    const eachDishElement = document.querySelectorAll(".each-dish")

    //run a function to check if there are any active
    eachDishElement.forEach((el, idx) => {
        if(CUISINES.includes(elementSpan[idx].textContent)){
            el.classList.add("selected")
            nextBtn.classList.add("active")
        }
        el.addEventListener("click", () =>{
            el.classList.toggle("selected") 

            //check if there is an element selected
            if(checkIfSelected(eachDishElement)){
                nextBtn.classList.add("active")
            }else {
                nextBtn.classList.remove("active")
            }
        })
    })

    nextBtn.addEventListener("click", () =>{
        CUISINES = []
        if(nextBtn.classList.contains("active")){
            for(let i = 0; i < eachDishElement.length; i++){
                if(eachDishElement[i].classList.contains("selected")){
                    CUISINES.push(elementSpan[i].textContent)
                }
            }

            //next segment function
            dietChoosing()
        }
    })

    prevBtn.addEventListener("click", ()=>{
        initialFunction()

        CUISINES = []
        for(let i = 0; i < eachDishElement.length; i++){
            if(eachDishElement[i].classList.contains("selected")){
                CUISINES.push(elementSpan[i].textContent)
            }
        }
    })
}

//diet selection segment
const dietChoosing = () => {
    const content = document.querySelector(".content")
    content.innerHTML = `
    <span class="section-title">Are you currently on a diet/s?</span>
    <span class="small-text">(choose all that apply)</span>

    <div class="dishes-wrapper">
        <div class="each-dish">
            <img src="./images/no diet.png" alt="">
            <span>No Diet</span>
        </div>
        <div class="each-dish">
            <img src="./images/gluten free.jpg" alt="">
            <span>Gluten Free</span>
        </div>
        <div class="each-dish">
            <img src="./images/keto.webp" alt="">
            <span>Ketogenic</span>
        </div>
        <div class="each-dish">
            <img src="./images/vegetarian.jpg" alt="">
            <span>Vegetarian</span>
        </div>
        <div class="each-dish">
            <img src="./images/vegan.jpeg" alt="">
            <span>Vegan</span>
        </div>
        <div class="each-dish">
            <img src="https://media.womensweekly.com.sg/public/2023/01/123rf-17.jpg?compress=true&quality=80&w=1080&dpr=1.3" alt="">
            <span>Pescetarian</span>
        </div>
        <div class="each-dish">
            <img src="./images/paleo.webp" alt="">
            <span>Paleo</span>
        </div>
    </div>

    <div class="buttons">

        <button class="prev">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
            <span>Prev</span>
        </button>

        <button class="next">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
        </button>

    </div>
    `
    segment = 2
    const allStepsEl = document.querySelectorAll(".step > div")
    const progressBarEl = document.querySelector(".progress-bar-active")

    progressBarEl.style.width = `${segment * 25}%`
    for(let i = 0; i < allStepsEl.length; i++){
        if(i == segment){
            allStepsEl[segment].classList.add("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }else if(i < segment){
            allStepsEl[i].classList.add("current")
            allStepsEl[i].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            `
        }else{
            allStepsEl[i].classList.remove("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }
    }

    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")

    prevBtn.addEventListener("click", ()=>{
        cuisineSection()

        DIETS = []

        eachDishElement.forEach((el, idx) =>{
            if(el.classList.contains("selected")){
                DIETS.push(elementSpan[idx].textContent)
            }
        })
    })

    const eachDishElement = document.querySelectorAll(".each-dish")
    const elementSpan = document.querySelectorAll(".each-dish > span")

    eachDishElement[0].addEventListener("click", ()=>{
        eachDishElement[0].classList.toggle("selected")

        for(let i = 1; i < eachDishElement.length; i++){
            eachDishElement[i].classList.remove("selected")
        }

        if(eachDishElement[0].classList.contains("selected")){
            nextBtn.classList.add("active")
        }else{
            nextBtn.classList.remove("active")
        }
    })

    for(let i = 1; i < eachDishElement.length; i++){
        eachDishElement[i].addEventListener("click", ()=>{
            //when clicked will remove the first element class
            eachDishElement[0].classList.remove("selected")

            eachDishElement[i].classList.toggle("selected")

            if(checkIfSelected(eachDishElement)){
                nextBtn.classList.add("active")
            }else{
                nextBtn.classList.remove("active")
            }
        })
    }

    eachDishElement.forEach((el, idx) =>{
        if(DIETS.includes(elementSpan[idx].textContent)){
            el.classList.add("selected")
            nextBtn.classList.add("active")
        }
    })

    nextBtn.addEventListener("click", ()=>{
        if(nextBtn.classList.contains("active")){
            DIETS = []

            eachDishElement.forEach((el, idx) =>{
                if(el.classList.contains("selected")){
                    DIETS.push(elementSpan[idx].textContent)
                }
            })

            //move on to the next segment
            intolerancesSegment()
        }
    })
}

//intolerances segment
const intolerancesSegment = () =>{
    const content = document.querySelector(".content")
    content.innerHTML = `
    <span class="section-title">Do you have any intolerance/s?</span>
    <span class="small-text">(choose all that apply)</span>

    <div class="dishes-wrapper">
        <div class="each-dish">
            <img src="./images/no intolerance.png" alt="">
            <span>No Intolerances</span>
        </div>
        <div class="each-dish">
            <img src="./images/dairy.png" alt="">
            <span>Dairy</span>
        </div>
        <div class="each-dish">
            <img src="./images/egg.png" alt="">
            <span>Egg</span>
        </div>
        <div class="each-dish">
            <img src="./images/no-wheat.png" alt="">
            <span>Gluten</span>
        </div>
        <div class="each-dish">
            <img src="./images/peanut.png" alt="">
            <span>Peanut</span>
        </div>
        <div class="each-dish">
            <img src="./images/fish.png" alt="">
            <span>Seafood</span>
        </div>
        <div class="each-dish">
            <img src="./images/sesame.png" alt="">
            <span>Sesame</span>
        </div>
        <div class="each-dish">
            <img src="./images/soy.png" alt="">
            <span>Soy</span>
        </div>
        <div class="each-dish">
            <img src="./images/wallnut.png" alt="">
            <span>Tree Nut</span>
        </div>
    </div>

    <div class="buttons">

        <button class="prev">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
            <span>Prev</span>
        </button>

        <button class="next">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
        </button>

    </div>
    `

    segment = 3
    const allStepsEl = document.querySelectorAll(".step > div")
    const progressBarEl = document.querySelector(".progress-bar-active")

    progressBarEl.style.width = `${segment * 25}%`
    for(let i = 0; i < allStepsEl.length; i++){
        if(i == segment){
            allStepsEl[segment].classList.add("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }else if(i < segment){
            allStepsEl[i].classList.add("current")
            allStepsEl[i].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            `
        }else{
            allStepsEl[i].classList.remove("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }
    }

    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")

    prevBtn.addEventListener("click", ()=>{
        dietChoosing()

        INTOLERANCES = []

        eachDishElement.forEach((el, idx) =>{
            if(el.classList.contains("selected")){
                INTOLERANCES.push(elementSpan[idx].textContent)
            }
        })
    })

    const eachDishElement = document.querySelectorAll(".each-dish")
    const elementSpan = document.querySelectorAll(".each-dish > span")

    eachDishElement[0].addEventListener("click", ()=>{
        eachDishElement[0].classList.toggle("selected")

        for(let i = 1; i < eachDishElement.length; i++){
            eachDishElement[i].classList.remove("selected")
        }

        if(eachDishElement[0].classList.contains("selected")){
            nextBtn.classList.add("active")
        }else{
            nextBtn.classList.remove("active")
        }
    })

    for(let i = 1; i < eachDishElement.length; i++){
        eachDishElement[i].addEventListener("click", ()=>{
            //when clicked will remove the first element class
            eachDishElement[0].classList.remove("selected")

            eachDishElement[i].classList.toggle("selected")

            if(checkIfSelected(eachDishElement)){
                nextBtn.classList.add("active")
            }else{
                nextBtn.classList.remove("active")
            }
        })
    }

    eachDishElement.forEach((el, idx) =>{
        if(INTOLERANCES.includes(elementSpan[idx].textContent)){
            el.classList.add("selected")
            nextBtn.classList.add("active")
        }
    })

    nextBtn.addEventListener("click", ()=>{
        if(nextBtn.classList.contains("active")){
            INTOLERANCES = []

            eachDishElement.forEach((el, idx) =>{
                if(el.classList.contains("selected")){
                    INTOLERANCES.push(elementSpan[idx].textContent)
                }
            })

            //show results
            results()
        }
    })
}


//results of the choices
const results = async () =>{
    const content = document.querySelector(".content")

    content.innerHTML = `
    <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    `
    let error = false
    let responseFromAPI

    try{
        responseFromAPI = await fetchingRecepies()
    } catch (e){
        error = true
    } finally{
        if(error){
            setTimeout(() => {
                content.innerHTML = `
            <div class="not-found">
                <span style="font-size: 2rem">NETWORK ERROR</span>
            </div>
                `
                segment = 4
                const allStepsEl = document.querySelectorAll(".step > div")
                const progressBarEl = document.querySelector(".progress-bar-active")

                progressBarEl.style.width = `${segment * 25}%`
                progressBarEl.classList.add("gradientStyle")
                for(let i = 0; i < allStepsEl.length; i++){
                    if(i == segment){
                        //allStepsEl[i].style.backgroundColor = "white"
                        allStepsEl[i].innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        `
                    }else if(i < segment){
                        allStepsEl[i].classList.add("current")
                        allStepsEl[i].innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        `
                    }else{
                        allStepsEl[i].classList.remove("current")
                        allStepsEl[i].innerHTML = `${i + 1}`
                    }
                }
            
            }, 3000);
            
            return
        }
    }
    
    
    segment = 4
    const allStepsEl = document.querySelectorAll(".step > div")
    const progressBarEl = document.querySelector(".progress-bar-active")

    progressBarEl.style.width = `${segment * 25}%`
    for(let i = 0; i < allStepsEl.length; i++){
        if(i == segment){
            allStepsEl[segment].classList.add("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }else if(i < segment){
            allStepsEl[i].classList.add("current")
            allStepsEl[i].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            `
        }else{
            allStepsEl[i].classList.remove("current")
            allStepsEl[i].innerHTML = `${i + 1}`
        }
    }

    //no recepies will just return the function
    if(responseFromAPI.length === 0){
        content.innerHTML = `
        <div class="not-found">
            <span>NOT FOUND</span>
            <span>we couldn't find any recepies that would match your criteria :(</span>
        </div>
        `
        return
    }

    
    content.innerHTML = `
    <span class="section-title">These are the recipies that match your criteria</span>
    <span class="small-text">(click on the recipe for more information)</span>

    <div class="final-dishes"><div>
    `

    const dishesElementWrapper = document.querySelector(".final-dishes")
    for(let i = 0; i < responseFromAPI.length; i++){
        const recipeElement = document.createElement("div")
        recipeElement.classList.add("result-recipe")
        dishesElementWrapper.appendChild(recipeElement)

        recipeElement.innerHTML = `
        <img src="${responseFromAPI[i].image}"/>
        <div>
            <span style="font-size:${fontSize(responseFromAPI[i].title.length)}">${responseFromAPI[i].title}</span>
            <div>
                <div style="border-color: ${colorFunc(responseFromAPI[i].healthScore)}" class="health-score">${responseFromAPI[i].healthScore}</div>
                <span>Health Score</span>
            </div>
        </div>
        `
        recipeElement.addEventListener("click", () => {
            moreRecipeInfo(responseFromAPI[i])
        })
    }
}

//clicking this will start the app
const getStartedBTN = document.querySelector(".get-started")
getStartedBTN.addEventListener("click", ()=>{
    const main = document.querySelector("main")
    main.innerHTML = `
    <div class="progress-wrapper">
        <div class="step">
            <div class="current">1</div>
            <span>Dish</span>
        </div>
        <div class="step">
            <div>2</div>
            <span>Cuisine</span>
        </div>
        <div class="step">
            <div>3</div>
            <span>Diet</span>
        </div>
        <div class="step">
            <div>4</div>
            <span>Intolerances</span>
        </div>
        <div class="step">
            <div>5</div>
            <span>Recipies!</span>
        </div>

        <div class="progress-bar"></div>
        <div class="progress-bar-active"></div>
    </div>
    <div class="content"></div>
    `
    initialFunction()
})


//other simple functions
const checkIfSelected = (param) => {
    let hasElement
    //reset the cuisines array
    for(let i = 0; i < param.length; i++){
        if(param[i].classList.contains("selected")){
            hasElement = true
        }
    }
    return hasElement
}

const colorFunc = (value) => {
    if(value > 80){
        return "#02eb1d"
    }else if(value > 65){
        return "#B1FE0B"
    }else if(value > 50){
        return "#e3eb02"
    }else if(value > 30){
        return "#FF8B1F"
    }else{
        return "#eb0202"
    }
}

const fontSize = (value) => {
    if(value > 40){
        return "0.8rem"
    }else if(value > 25){
        return "0.9rem"
    }else{
        return "1rem"
    }
}


//user clicking on a recipe
//extra info about recipe function
const moreRecipeInfo = (recipe) =>{
    
    const content = document.querySelector(".content")
    
    //console.log(recipe.analyzedInstructions)
    
    //console.log(recipe.image) done
    //console.log(recipe.title) done
    //console.log(recipe.nutrition)
    
    document.body.style.overflow = "hidden"
    const extraInfo = document.querySelector(".extra-info")
    extraInfo.innerHTML = `
    <div class="parent-holder">
        <div class="svg-holder">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>

        <span class="dish-name">${recipe.title}</span>

        <div>
            <div class="img-chart_wrap">
                <img src="${recipe.image}" alt="">

                <div class="ingredients"></div>

                <div class="donut-chart-holder">
                    <canvas id="chartjs-donut"></canvas>
                </div>
            </div>

            <div class="step-elements-wrap">

                <div class="step-nutri-only">
                    <div class="step-by-step"></div>
                    <div class="nutrients">
                        <span>Nutrition Facts</span>

                        <div class="small-break"></div>

                        <div>
                            <span class="bolder serving">Serving size</span>
                            <span class="bolder serving">${recipe.nutrition.weightPerServing.amount}${recipe.nutrition.weightPerServing.unit}</span>
                        </div>

                        <div class="big-break"></div>

                        <div>
                            <span class="bolder cals">Calories</span>
                            <span class="bolder cals">${Math.round(recipe.nutrition.nutrients[0].amount)}</span>
                        </div>

                        <div class="middle-break"></div>

                        <span class="daily-val">% Daily Value</span>

                        <div class="small-break"></div>

                        <div>
                            <span><span class="bolder">Fat</span></span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[1].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span class="inside">Saturated Fat</span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[2].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span><span class="bolder">Cholesterol</span></span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[6].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span><span class="bolder">Sodium</span></span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[7].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span><span class="bolder">Carbohydrates</span></span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[3].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span class="inside">Fiber</span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[13].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span class="inside">Sugar</span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[5].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div style="margin-bottom: 2px">
                            <span><span class="bolder">Protein</span></span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[8].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="big-break"></div>

                        <div style="margin-top: 2px">
                            <span>Vitamin C</span>
                            <span class="bolder">${Math.round(recipe.nutrition.nutrients[10].percentOfDailyNeeds)}%</span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span>Calcium</span>
                            <span class="bolder"></span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span>Iron</span>
                            <span class="bolder"></span>
                        </div>

                        <div class="small-break"></div>

                        <div>
                            <span>Potassium</span>
                            <span class="bolder"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    const stepInstructionEl = document.querySelector(".step-by-step")
    for(let i = 0; i < recipe.analyzedInstructions[0].steps.length; i++){
        //recipe.analyzedInstructions[0].steps[i].step)
        const eachStep = document.createElement("div")
        eachStep.classList.add("each-step")
        
        eachStep.innerHTML = `
        <span>${i + 1}.</span>
        <span>${recipe.analyzedInstructions[0].steps[i].step}</span>
        `
        stepInstructionEl.appendChild(eachStep)
    }
    const ingredientsEl = document.querySelector(".ingredients") 
    const nutrientsSpan = document.querySelectorAll(".nutrients > div > span:nth-of-type(1)")
    const percentSpan = document.querySelectorAll(".nutrients > div > span:nth-of-type(2)")

    nutrientsSpan.forEach((each, idx) => {
        //console.log(recipe.nutrition.nutrients[idx])
        //console.log(each.textContent)
        for(let i = 0; i < recipe.nutrition.nutrients.length; i++){
            if(each.textContent == recipe.nutrition.nutrients[i].name && each.textContent !== "Calories"){
                percentSpan[idx].textContent = `${Math.round(recipe.nutrition.nutrients[i].percentOfDailyNeeds)}%`

                if(each.textContent == "Fat" || each.textContent == "Cholesterol" || each.textContent == "Sodium" || each.textContent == "Carbohydrates" || each.textContent == "Protein"){
                    each.innerHTML = `<span class="bolder">${recipe.nutrition.nutrients[i].name}</span> ${Math.round(recipe.nutrition.nutrients[i].amount)}${recipe.nutrition.nutrients[i].unit}`
                }else{
                    each.textContent = `${recipe.nutrition.nutrients[i].name} ${Math.round(recipe.nutrition.nutrients[i].amount)}${recipe.nutrition.nutrients[i].unit}` 
                }
            }
        }
    })

    let ingredientsArray = []
    for(let i = 0; i < recipe.nutrition.ingredients.length; i++){
        ingredientsArray.push(recipe.nutrition.ingredients[i].name)
    }
    
    //filter out if there are any duplicates
    let filterIngredients = ingredientsArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
    filterIngredients = filterIngredients.join(", ")

    ingredientsEl.textContent = filterIngredients

    extraInfo.style.display = "flex"

    //chart implementation
    const chartFunction = () => {
        const ctx = document.getElementById("chartjs-donut").getContext("2d")
    
        const donutData = {
            labels: ["Fat", "Carbohydrates", "Protein"],
            datasets: [{
                label: "",
                data: [Math.round(recipe.nutrition.caloricBreakdown.percentFat), Math.round(recipe.nutrition.caloricBreakdown.percentCarbs), Math.round(recipe.nutrition.caloricBreakdown.percentProtein)],
                backgroundColor: ["#FFD374", "#F597AF", "#66B8E7"],
                hoverBorderColor: "#FF6F00"
            }]
        }
    
        const plugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
              const {ctx} = chart;
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = options.color;
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
        };
    
        const middleLabel = {
            id: "doughnutLabel",
            afterDatasetDraw(chart, args, pluginOptions) {
                const {ctx, data} = chart 
                ctx.save()
                const xCoor = chart.getDatasetMeta(0).data[0].x
                const yCoor = chart.getDatasetMeta(0).data[0].y
    
                ctx.font = "600 1.1rem Montserrat"
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#050505"
                ctx.fillText("Caloric", xCoor, yCoor - 15)
                ctx.fillText("Breakdown", xCoor, yCoor + 15)
            }
        }
    
        const config = {
            type: "doughnut",
            data: donutData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    customCanvasBackgroundColor: {
                        color: "#fafafa"
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (ctx) => (`${ctx.raw}%`),
                            title: (ctx) => (`${ctx[0].label}:`)
                        },
                        backgroundColor: "#fafafa",
                        borderColor: "#FF6F00",
                        borderWidth: 2,
                        displayColors: false,
                        bodyFontColor: "blue",
                        titleColor: "#FF6F00",
                        bodyColor: "#050505",
                        caretPadding: 10,
                        caretSize: 0,
                        bodyAlign: "center",
                        titleFont: {
                            size: 20
                        },
                        bodyFont: {
                            size: 25
                        },
                        padding: 10,
                        z: 5
                    },
                },
            },
            plugins: [plugin, middleLabel]
        }
    
        let chartDisplay = new Chart(ctx, config)
    }
    chartFunction()

    const closeX = document.querySelector(".svg-holder")
    closeX.addEventListener("click", () => {
        document.body.style.overflowY = "auto"
        extraInfo.style.display = "none"
    })

    const parent = document.querySelector(".parent-holder")
    if(extraInfo.scrollHeight > extraInfo.clientHeight){
        extraInfo.style.alignItems = "baseline"
        parent.style.margin = "1.5rem 0"
    }else {
        extraInfo.style.alignItems = "center"
        parent.style.margin = "0"
    }
}