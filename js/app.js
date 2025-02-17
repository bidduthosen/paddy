const loadCategoriesData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        displayCategoriesData(data.categories);

    }
    catch (err) {
        console.error(err)
    };
};




// categories pets id data
const loadCategoryPetsData = async(categoryId)=>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`)
        const data = await res.json();

        // active btn
        activePetsButton(categoryId)
        document.getElementById('loader').classList.remove('hidden')
        
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden')
            displayPets(data.data)
            
        }, 700);
    }
    catch (err) {
        console.error(err)
    };

};


// pets data
const loadPetsData = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        const data = await res.json();
        
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden')
            displayPets(data.pets);
            
        }, 2000);

    } catch (err) {
        console.error(err)
    }
}


// pets details data load
const loadpetDetailsData = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const data = await res.json();
        displayPetDetails(data.petData)

    } catch (err) {
        console.error(err)
    }
}

// display category data
const displayCategoriesData = (categories) => {
    const petsContainer = document.getElementById('pets');

    categories?.map(item => {
        const div = document.createElement('div');
        div.innerHTML =
            `
            <button id='btn-${item?.category}' onclick ="loadCategoryPetsData('${item?.category}')" class="btn btn-outline btn-success rounded-none w-full category-btn"><img class="rounded-lg w-8" src="${item?.category_icon}" alt=""> ${item?.category}</button>
            
        `;
        petsContainer.appendChild(div);
    })
};


// display pets data
const displayPets = pets => {
    const petsContent = document.getElementById('pets-content');
    petsContent.innerHTML = "";
    
    // if pets data zero than set inner text
    if(pets.length == 0){
        document.getElementById('pets-content').classList.remove('grid');
        petsContent.innerHTML = `
            <div class="flex  items-center flex-col space-y-4 h-screen mt-5">
                <img class ="w-28" src="https://img.icons8.com/?size=100&id=XOr3HY3XJ3a4&format=png&color=000000" alt="">
                <h3 class=" text-3xl font-bold text-red-400">Opss!!.. No Data Available!</h3>
            </div>
        `;

    }else{
        document.getElementById('pets-content').classList.add('grid');
    }

    pets.map(pet => {
        const { breed, date_of_birth, image, petId, pet_name, price, gender } = pet;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
             <!-- card  -->
            <div class="border border-gray-300 rounded-lg p-4 space-y-3">
              <img class="rounded-lg h-48 w-full" src="${image}" alt=""  >
              <h5 class="font-semibold text-2xl">${pet_name ? pet_name : 'UnKnown'}</h5>
              <div class="flex items-center gap-3">
                <img src="./assets/breed.png" alt="">
                <h5 class="font-semibold text-base text-gray-500">Breed: ${breed ? breed : 'Unkhown'}</h5>
              </div>
              <div class="flex items-center gap-3">
                <img src="./assets/barth.png" alt="">
                <h5 class="font-semibold text-base text-gray-500">Birth: ${date_of_birth ? date_of_birth : 'N/A'}</h5>
              </div>
              <div class="flex items-center gap-3">
                <img src="./assets/gender.png" alt="">
                <h5 class="font-semibold text-base text-gray-500">Gender: ${gender ? gender : 'N/A'}</h5>
              </div>
              <div class="flex items-center gap-3">
                <img src="./assets/dollar.png" alt="">
                <h5 class="font-semibold text-base text-gray-500">Price : ${price ? price : 'N/A'}</h5>
              </div>
              <div class="flex justify-between items-center gap-4 pt-3">
                
                <button onclick= "thumbsApendImg('${image}')" class="btn btn-sm  btn-outline btn-success"><i class="fa-regular fa-thumbs-up "></i></button>
                <button id='btnAdopt-${petId}' onclick="countdownAdopt('${petId}')" class="btn btn-sm  btn-outline btn-success adopt-btn">Adopt</button>
                <button onclick= "loadpetDetailsData(${petId})" class="btn btn-sm  btn-outline btn-success">Details</button>
              </div>
            </div>
        `;
        petsContent.appendChild(newDiv);


    });
};



// click this button count down 

// aside apend  image
const thumbsApendImg = (image) => {
    const asideImgContent = document.getElementById('aside-img-content');
    const divImg = document.createElement('div');
    divImg.innerHTML = `
    <img class="rounded-xl" src="${image}" alt="">
    `;
    asideImgContent.appendChild(divImg)
}

// display pets details 
const displayPetDetails = (details) => {
    const { breed, date_of_birth, image, pet_name, price, gender, vaccinated_status, pet_details } = details;

    // clickded modal open
    document.getElementById('my_modal_6').click();
    const detailsContent = document.getElementById('customModal');
    document.getElementById('customModal').innerHTML = '';

    const div = document.createElement('div');
    div.className = 'flex justify-center items-center flex-col'
    div.innerHTML = `
    <!-- card  -->
        <div class=" rounded-lg  space-y-3">
            <img class=" w-full md:h-[500px] rounded-2xl" src="${image}" alt=""> 
            <h5 class="font-semibold text-2xl">${pet_name ? pet_name : 'UnKnown'}</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                    <img src="./assets/breed.png" alt="">
                    <h5 class="font-semibold text-base text-gray-500">Breed: ${breed ? breed : 'Unkhown'}</h5>
                </div>
                <div class="flex items-center gap-3">
                    <img src="./assets/barth.png" alt="">
                    <h5 class="font-semibold text-base text-gray-500">Birth: ${date_of_birth ? date_of_birth : 'N/A'}</h5>
                </div>
                <div class="flex items-center gap-3">
                    <img src="./assets/gender.png" alt="">
                    <h5 class="font-semibold text-base text-gray-500">Gender: ${gender ? gender : 'N/A'}</h5>
                </div>
                <div class="flex items-center gap-3">
                    <img src="./assets/dollar.png" alt="">
                    <h5 class="font-semibold text-base text-gray-500">Price : ${price ? price : 'N/A'}</h5>
                </div>
                </div>
                <div class="flex items-center gap-3">
                    <img src="./assets/gender.png" alt="">
                    <h5 class="font-semibold text-base text-gray-500">Vaccinated status: ${vaccinated_status ? vaccinated_status : 'N/A'}</h5>
                </div>
            </div>
            <div class="justify-start text-start">
                <h3 class="font-bold text-lg pb-3 mt-6">Details Information</h3>
                <h5 class="font-medium text-base text-gray-500">Vaccinated status: ${pet_details ? pet_details : 'N/A'}</h5>
            </div>
            <div class="modal-action ">
            <label for="my_modal_6" class="btn btn-error">Close!</label>
            </div> 
        </div>
    `;
    detailsContent.appendChild(div);
}

loadCategoriesData();
loadPetsData()



const countdownAdopt = (petId) =>{
    const countdownModal = document.getElementById('countdown-modal');
    const countDownElement = document.getElementById('countdown');
    const adoptBtnId = document.getElementById(`btnAdopt-${petId}`)
    adoptBtnId.innerText = 'Adobted'
    adoptBtnId.disabled = true;
    // for(const adoptBtn of adoptBtns){
        //     adoptBtn.disabled = true;

        // }
        let count = 3;
        countdownModal.classList.remove('hidden')
        countDownElement.innerText = count;
        const interval = setInterval(()=>{
            count--;
            countDownElement.innerText = count;
            if(count === 0){
            clearInterval(interval);
            countdownModal.classList.add('hidden')
        }
    }, 1000);
};
