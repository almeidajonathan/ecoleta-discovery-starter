// document.querySelector("select[name='uf']").addEventListener('change', () => {
//     console.log('mudei')
// })
const ufSelected = document.querySelector("select[name='uf']")
const citySelected = document.querySelector("select[name='city']")
const stateInput = document.querySelector("input[name='state']")


function populateUFs() {

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json())
    .then( states => {
        for(let state of states) {
            ufSelected.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const indexOfSelectedState = event.target.selectedIndex
    console.log(`índice ${indexOfSelectedState}`)
    stateInput.value = event.target.options[indexOfSelectedState].text
    console.log(`state input: ${stateInput.value}`)
    
    const uf = event.target.value

    citySelected.innerHTML = "<option value=''>Selecione a cidade</option>"
    citySelected.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos?orderBy=nome`)
    .then( res => res.json())
    .then( cities => {
        // city.getAttribute('disable').rem
        for(let city of cities) {
            // console.log(`UF:${uf} cidade:${city.nome}`)
            citySelected.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelected.disabled = false
    })
}

ufSelected.addEventListener("change", getCities)

// Itens de coleta
let selectedItems = []


const itemsToColeta = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name='items']")


function handleSelectedItem(event) {
    const itemLi = event.target
    //add e removendo classe "selected"
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verifica se existe itens selecionados
    const alreadySelected = selectedItems. findIndex((item) => item == itemId)
    
    if(alreadySelected >= 0) {
        // remove o elemento do array de selecionados
        const filteredItems = selectedItems.filter(item => item != itemId)
        
        selectedItems = filteredItems

    } else {
        //adiciona o id do elemento ao array de selecionados
        selectedItems.push(itemId)

    }
    //atualizando o collectedItems
    collectedItems.value = selectedItems
    
}


for(let item of itemsToColeta) {
    item.addEventListener("click", handleSelectedItem)
    // console.log(item.getAttribute("data-id"))
}