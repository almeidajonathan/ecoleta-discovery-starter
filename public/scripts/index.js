const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closeButton = document.querySelector("#modal .header a")


function openModal() {
    modal.classList.remove("hide")
}

function closeModal() {
    modal.classList.add("hide")
}

buttonSearch.addEventListener("click", openModal)
closeButton.addEventListener("click", closeModal)