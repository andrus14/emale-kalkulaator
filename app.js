let occupations = {
    43: {name: 'Logistik', rate: 0},
    83: {name: 'Autojuht', rate: 0},
    94: {name: 'Nõudepesija', rate: 0},
    53: {name: 'Lapsehoidja', rate: 0}
}

let total = 0

const occupationSelect = document.querySelector('#occupation-select')
const listContainer = document.querySelector('#list-container')
const hourInput = document.querySelector('#hour-input')
const submitBtn = document.querySelector('#submit')
const totalDiv = document.querySelector('#total')

for ( const prop in occupations ) {
    let option = document.createElement('option')
    option.value = prop
    option.text = occupations[prop].name
    occupationSelect.append(option)
}

fetch('http://andmebaas.stat.ee/sdmx-json/data/PA627/19+23+35+39.3.1/all?startTime=2014&endTime=2014&dimensionAtObservation=allDimensions')
.then(response => response.json())
.then(data => {
    data.structure.dimensions.observation[0].values.forEach((el, i) => {
        occupationKey = el.name.split(' ')[0]
        key = i + ':0:0:0'
        occupationRate = data.dataSets[0].observations[key][0]
        occupations[occupationKey].rate = occupationRate
    })

    submitBtn.addEventListener('click', function(e) {

        selectedKey = occupationSelect.value

        let pay = hourInput.value * occupations[selectedKey].rate
        total += pay;
        rowDiv = document.createElement('div')
        rowDiv.classList.add('list-item')
        rowDiv.innerHTML = `
            <div class="list-item__occupation">${occupations[selectedKey].name}</div>
            <div class="list-item__salary">${pay.toFixed(2).replace('.', ',')}€</div>
            <div class="list-item__delete" data-pay-float="${pay}">×</div>
        `
        listContainer.append(rowDiv)

        totalDiv.innerHTML = total.toFixed(2).replace('.', ',') + '€'
    })
})