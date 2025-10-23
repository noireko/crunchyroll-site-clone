const hamburguesa = document.getElementById("hamb");
const nav = document.getElementById("nav");
const visCel = document.getElementById("vis-cel"); 

hamburguesa.addEventListener("click", () => {
    nav.classList.toggle("active");
});

visCel.addEventListener("click", () => {
    visCel.classList.toggle("active");
})
