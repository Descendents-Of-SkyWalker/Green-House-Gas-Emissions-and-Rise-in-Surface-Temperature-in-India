const bar = document.querySelector('.bar');
const list = document.querySelectorAll('#tabs');
const options = document.querySelector('#options');
const tabs = [['annual', 'absolute', 'cumulative', 'annual share'], ['major city', 'country', 'global average', 'global max'], []];
const url = [['../Extracted Data India/CO2 Country Profile India/annual-co2-emissions-India.csv', '../Extracted Data India/CO2 Country Profile India/absolute-change-co2-India.csv', '../Extracted Data India/CO2 Country Profile India/cumulative-co-emissions-India.csv', '../Extracted Data India/CO2 Country Profile India/annual-share-co2-India.csv'], ['../Extracted Data India/Climate Change-Earth Surface Temperature India/GLTByMajorCityIndia.csv', '../Extracted Data India/Climate Change-Earth Surface Temperature India/India.csv', '../Extracted Data India/Climate Change-Earth Surface Temperature India/Global.csv', '../Extracted Data India/Climate Change-Earth Surface Temperature India/Global.csv']];
let coords = list[0].getBoundingClientRect();
setBounds(coords);
setOptions(0);
list[0].classList.add('active');
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', () => {
        removeAllChildNodes(document.querySelector('#display'));
        for (let j of list) {
            j.classList.remove('active');
        }
        list[i].classList.add('active');
        let coords = list[i].getBoundingClientRect();
        setBounds(coords);
        setOptions(i);
    });
}
const about = document.querySelector('#about');
about.addEventListener('click', () => {
    const activeClass = document.querySelector('.active');
    activeClass.classList.remove('active');
    options.style.display = 'none';
    document.querySelector('.box1 pre').textContent = '';
    document.querySelector('.box2').innerHTML = '';
    document.querySelector('.box3').innerHTML = '';
    let aboutCoords = about.getBoundingClientRect();
    setBounds(aboutCoords);
    const display = document.querySelector('#display');
    removeAllChildNodes(display);
    const aboutBox = document.createElement('div');
    aboutBox.classList.add('about-box');
    aboutBox.innerHTML = "Done By<br><br>Rajvi Jasani 19BCE2347<br><br>Gaurav Singh 19BCE2311<br><br>Vinayak Dubey 19BCE0291<br><br>Suhani Mathur 19BCE2333";
    display.appendChild(aboutBox);
});

function setBounds(coords) {
    bar.style.left = `${coords.x - 10}px`;
    bar.style.top = `${coords.y + 30}px`;
    bar.style.width = `${coords.width + 20}px`;
    bar.style.height = `1px`;
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function setOptions(i) {
    if (i !== 2) {
        if (options.style.display === 'none') {
            options.style.display = 'flex';
        }
        removeAllChildNodes(options);
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
        document.querySelector('.box2').innerHTML = '';
        document.querySelector('.box3').innerHTML = '';
        const analysis = document.createElement('div');
        analysis.classList.add('analysis')
        document.querySelector('#display').appendChild(analysis);
        sendXHR("GET", "../Outputs/Analysis.txt", null, function (response) {
            analysis.innerHTML = response;
        });
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
            removeAllChildNodes(document.querySelector('#display'));
            loadDataInfo(idx, i);
        });
    }
}

function sendXHR(type, url, data, callback) {
    var newXHR = new XMLHttpRequest() || new window.ActiveXObject("Microsoft.XMLHTTP");
    newXHR.open(type, url, true);
    newXHR.send(data);
    newXHR.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            callback(this.response);
        }
    };
}