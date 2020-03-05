let occupations = {
    43: {name: 'Logistik', rate: 0},
    83: {name: 'Autojuht', rate: 0},
    94: {name: 'Nõudepesija', rate: 0},
    53: {name: 'Lapsehoidja', rate: 0}
}

const occupationSelect = document.querySelector('#occupation-select')
const rateDiv = document.querySelector('#container')

for ( const prop in occupations ) {
    let option = document.createElement('option')
    option.value = prop
    option.text = occupations[prop].name
    occupationSelect.append(option)
}

fetch('http://andmebaas.stat.ee/sdmx-json/data/PA627/19+23+35+39.3.1/all?startTime=2014&endTime=2014&dimensionAtObservation=allDimensions')
.then(response => response.json())
.then(data => {
    console.log(data.structure.dimensions.observation[0])
    data.structure.dimensions.observation[0].values.forEach((el, i) => {
        occupationKey = el.name.split(' ')[0]
        key = i + ':0:0:0'
        occupationRate = data.dataSets[0].observations[key][0]
        occupations[occupationKey].rate = occupationRate
    })
    console.log(occupations)

    occupationSelect.addEventListener('change', function(e) {
        selectedKey = e.currentTarget.value
        rateDiv.innerHTML = occupations[selectedKey].rate
    })
})