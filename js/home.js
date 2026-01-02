//todo : will add the logic of the nav => to details.html in script below
//todo : make card-body flex-grow : 1  instead of [style="min-height: 350px !important;"]


// ?================> Global <=========================
const gameNav = document.querySelector(".game-nav");
const allLinks = document.querySelectorAll(".game-nav .nav-link");
let gamesData = []
//? /////////////////////////////////////////////////////////////////////////////////////////////////


// !================> when start <=========================
//to keep what i pressed after loading "refresh" :)
for (const link of allLinks) {

    //// if (localStorage.getItem("active-link") === link.textContent) {
    ////     gameNav.querySelector(".active").classList.remove("active"); // mustttttt come before adding active to the target :) [to avoid removing what i added already ya noor :)]
    ////     link.classList.add("active");
    ////     break;
    //// }
    // =====================
    // more cleaner:
    link.classList.toggle("active", (localStorage.getItem("active-link") === link.textContent))
}
// =====================
//new browser ... so don't store in localStorage :)   || the first time  
if (localStorage.getItem("active-link") === null) {
    allLinks[0].classList.add("active");
}
//? /////////////////////////////////////////////////////////////////////////////////////////////////

async function init() {
    const activeLinkNow = document.querySelector(".game-nav .nav-link.active");
    const activeLinkNowName = activeLinkNow.getAttribute("data-category");
    await getGames(activeLinkNowName);//to fill [gamesData] which will be displayed       &   activeLinkNowName: at the first time i will visit the website and willnot click a nav-link 
    displayGames();


}
init();


// *================> Events <=========================
//i will not make propagation this time ...because i don't need when i click nav anywhere -> remove the current active
allLinks.forEach((link) => {
    link.addEventListener("click",async function () {
        gameNav.querySelector(".active").classList.remove("active"); // mustttttt come before adding active to the target :) [to avoid removing what i added already ya noor :)]
        this.classList.add("active");

        localStorage.setItem("active-link", link.textContent);// "active-link" : "shooter"

        const categoryName = link.getAttribute("data-category");//shooter |  .. ..
        await getGames(categoryName);
        displayGames();



    })

});
//? /////////////////////////////////////////////////////////////////////////////////////////////////

// !================> functions <=========================
async function getGames(category) {

    showLoader();
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9da1b22f21mshea9db4fd44a74a3p1ebae4jsn1f417dcd99ec',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };


    try {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        gamesData = await response.json();//[{} , {} , ...]
        hideLoader();
        console.log(gamesData);


    } catch (error) {
        console.error(error);
    }
}
// ==============================
function displayGames() {

    let box = ``;
    for (let i = 0; i < gamesData.length; ++i) {
        box += `
        <div class="col">
                        <div class="card  shadow">
                            <!-- todo js    src , alt -->
                            <div class="card-body" style="min-height: 350px !important;">
                                <img src="${gamesData[i].thumbnail}" class="card-img-top" alt="${gamesData[i].title}">
                                <div class="d-flex align-items-center justify-content-between py-2">
                                    <h5 class="card-title mb-0">${gamesData[i].title}</h5>
                                    <span class="badge " style="background-color: #09c;">Free</span>
                                </div>
                                <p class="card-text text-center">${gamesData[i].short_description}</p>
                            </div>

                            <div class="card-footer p-2">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="badge bg-secondary">${gamesData[i].genre}</span>
                                    <span class="badge bg-secondary">${gamesData[i].platform}</span>
                                </div>
                            </div>
                        </div>

                    </div>
        
        
        `;
    }
    document.getElementById("rowData").innerHTML = box;

}
// =====================
function showLoader(){
    document.querySelector(".loading").classList.remove("d-none");

}
function hideLoader(){
    document.querySelector(".loading").classList.add("d-none");


}
// ================> validation <=========================

