const bar = document.querySelector('.bar');
const list = document.querySelectorAll('#tabs');
const options = document.querySelector('#options');
const tabs = [['historical emissions'], ['absolute', 'annual', 'cummulative'], ['major city', 'state', 'country', 'global'], []];
const url = [['../Extracted Data India/GHG Emission India/historical_emissions_India.csv'], ['../Extracted Data India/CO2 Country Profile India/absolute-change-co2-India.csv', '../Extracted Data India/CO2 Country Profile India/annual-co2-emissions-India.csv', '../Extracted Data India/CO2 Country Profile India/cumulative-co-emissions-India.csv'], ['../Extracted Data India/Climate Change-Earth Surface Temperature India/GLTByMajorCityIndia.csv', '../Extracted Data India/Climate Change-Earth Surface Temperature India/GLTByStateIndia.csv', '../Extracted Data India/Climate Change-Earth Surface Temperature India/GLTIndia.csv', '../Climate Change-Earth Surface Temperature/GlobalTemperatures.csv']];
let coords = list[0].getBoundingClientRect();
setBounds(coords);
setOptions(0);
list[0].classList.add('active');
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', () => {
        for (let j of list) {
            j.classList.remove('active');
        }
        list[i].classList.add('active');
        let coords = list[i].getBoundingClientRect();
        setBounds(coords);
        setOptions(i);
    });
}

function setBounds(coords) {
    bar.style.left = `${coords.x - 10}px`;
    bar.style.top = `${coords.y + 30}px`;
    bar.style.width = `${coords.width + 20}px`;
    bar.style.height = `1px`;
}
function removeAllChildNodes() {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
}
function setOptions(i) {
    if (i !== 3) {
        if (options.style.display === 'none') {
            options.style.display = 'flex';
        }
        removeAllChildNodes();
        for (let x of tabs[i]) {
            const div = document.createElement('div');
            div.classList.add('opt');
            div.innerHTML = x;
            options.appendChild(div);
        }
        const listOpt = document.querySelectorAll('.opt');
        listOpt[0].classList.add('selected');
        setSelected(listOpt, i)
    }
    else {
        options.style.display = 'none';
        document.querySelector('.box1 pre').textContent = '';
    }
}
function setSelected(listOpt, idx) {
    loadDataInfo(idx, 0);
    for (let i = 0; i < listOpt.length; i++) {
        listOpt[i].addEventListener('click', () => {
            for (let j of listOpt) {
                j.classList.remove('selected');
            }
            listOpt[i].classList.add('selected');
            loadDataInfo(idx, i);
        });
    }
}
function loadDataInfo(idx, i) {
    console.log(url[idx][i]);
    d3.csv(url[idx][i]).then(data => {
        let message = '';
        message += "File Size: " + Math.round(d3.csvFormat(data).length / 1024) + " kB\n\n";
        message += "No. of Rows: " + data.length + " rows\n\n"; // Excluding the header row
        message += "No. of Columns: " + data.columns.length + " columns\n\n";
        document.querySelector('.box1 pre').textContent = '';
        document.querySelector('.box1 pre').textContent = message;
    })
}