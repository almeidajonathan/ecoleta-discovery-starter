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

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos?orderBy=nome`)
    .then( res => res.json())
    .then( cities => {
        // city.getAttribute('disable').rem
        for(let city of cities) {
            // console.log(`UF:${uf} cidade:${city.nome}`)
            citySelected.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelected.disabled = false
    })
}

ufSelected.addEventListener("change", getCities)