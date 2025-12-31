


// ?================> Global <=========================
const gameNav = document.querySelector(".game-nav");
const allLinks = document.querySelectorAll(".game-nav .nav-link");


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
    link.classList.toggle("active" ,(localStorage.getItem("active-link") === link.textContent) )
}
// =====================
//new browser ... so don't store in localStorage :)   || the first time  
if(localStorage.getItem("active-link") === null){
    allLinks[0].classList.add("active");
}



// *================> Events <=========================
//i will not make propagation this time ...because i don't need when i click nav anywhere -> remove the current active
allLinks.forEach((link) => {
    link.addEventListener("click", function () {
        gameNav.querySelector(".active").classList.remove("active"); // mustttttt come before adding active to the target :) [to avoid removing what i added already ya noor :)]
        this.classList.add("active");

        localStorage.setItem("active-link", link.textContent);// "active-link" : "shooter"


    })

});

// !================> functions <=========================


// ================> validation <=========================

