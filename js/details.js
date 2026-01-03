
// ?================> Global <=========================
const searchParams = location.search; //?id=123
// console.log(searchParams);
const params = new URLSearchParams(searchParams);
const gameId = params.get("id");
let gameData = {};
console.log(gameId);//123



// !================> when start <=========================
( async ()=>{
    await getDetails();
    displayDetails();

    //await is affect on the code inside the async only :)
    //so we must make the next lines inside the async
    
    console.log(gameData.thumbnail);
    const backgroundDetailsImg  = gameData.thumbnail.replace('thumbnail.jpg' , 'background.jpg');
    console.log(backgroundDetailsImg);
    
    document.querySelector(".details-section").style.backgroundImage = `URL(${backgroundDetailsImg}) , url("./images/login.jpg")`;
    //url("./images/login.jpg")         :as a default .. will be loaded when there is not a bg for this game

})();
// ======================

// !================> functions <=========================

async function getDetails() {

    showLoader();
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9da1b22f21mshea9db4fd44a74a3p1ebae4jsn1f417dcd99ec',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response =await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
        const data = await response.json();
        console.log(data);
        gameData = data;

    } catch (error) {
        console.error(error);
        
    }
    hideLoader();
}
// ==================
function displayDetails() {
    document.getElementById("detailsRowData").innerHTML = `
    <div class="col-lg-4">
                        <div class="img rounded-3 overflow-hidden">
                            <img src="${gameData.thumbnail}" class="w-100" alt="${gameData.title}">

                        </div>

                    </div>
                    <div class="col-lg-8">
                        <div class="content">

                            <!-- the breadcrum-divider by default : / -->
                            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <!-- the  num of breadcrumb-items which are not active [before active] based on where i come from -->
                                    <li class="breadcrumb-item"><a href="./home.html">Home</a></li>
                                    <!-- todo js -->
                                    <li class="breadcrumb-item active" aria-current="page">${gameData.title}</li>
                                </ol>
                            </nav>

                            <div>
                                <span class="display-4" style="color: #09c;">${gameData.title}</span>
                                <h3 class="h5 fw-bold my-3">About ${gameData.title}</h3>
                                <p class="">${gameData.description}</p>
                            </div>
                        </div>

                    </div>
    
    
    `;

}
// =====================
function showLoader(){
    document.querySelector(".loading").classList.remove("d-none");

}
function hideLoader(){
    document.querySelector(".loading").classList.add("d-none");

}

