const hotel = [];
const xhrHotel = new XMLHttpRequest();
// xhrHotel.open('GET', 'http://localhost:3000/GET', true);
xhrHotel.open('GET', 'https://cors-anywhere.herokuapp.com/https://data.ntpc.gov.tw/od/data/api/73CB0172-C596-490B-B505-186DE74782D1?$format=json', true);
xhrHotel.send(null);
xhrHotel.onload = function () {
    if (xhrHotel.status >= 200 && xhrHotel.status < 400) {
        const hotelData = JSON.parse(xhrHotel.responseText);
        // const hotelData = hotelAry[0];
        hotelData.forEach(function(value){
            hotel.push(value);
        })
        filterZone(hotel);
    } else {
        console.log('error');
    }
}
// 篩選並撈出區域
const selectZone = document.getElementById('selectZone');
const asideSelectZone = document.getElementById('asideSelectZone');
const searchZone = document.getElementById('searchZone');
const allZone = [];

function filterZone(ary) {
    ary.forEach(function (value) {
        const zone = value.Add.substring(3, 6);
        allZone.push(zone);
    })
    // 篩選
    const zones = [];
    allZone.forEach(function (value) {
        if (zones.indexOf(value) === -1) {
            zones.push(value);
        }
    })
    // 渲染到 DOM
    let str = '';
    zones.forEach(function (value) {
        str += `
            <option value="${value}">${value}</option> 
        `
    })
    selectZone.innerHTML += str;
    asideSelectZone.innerHTML += str;
}

function getZone(e) {
    // 取得 option value 的值
    let nowZone = e.target.value;
    // 去比對資料，抓出索引值
    let getIndex = [];
    allZone.forEach(function (zone, index) {
        if (zone === nowZone) {
            getIndex.push(index);
        }
    })
    // 渲染出相符的資料
    showZoneTitle(nowZone);
    showZone(getIndex);
    
}

function getZoneAside(){
    let nowZone = asideSelectZone.value;
    let getIndex = [];
    allZone.forEach(function (zone, index) {
        if (zone === nowZone) {
            getIndex.push(index);
        }
    })
    // 渲染出相符的資料
    showZoneTitle(nowZone);
    showZone(getIndex);
    
}

function showZoneTitle (nowZone){
    let zoneTitle = document.getElementById('zoneTitle');
    zoneTitle.innerHTML = nowZone;
}

function showZone(getIndex){
    const hotelList = document.getElementById('hotelList');
    let lists ='';
    getIndex.forEach(function (index) {
        lists += `
            <div class="col-md-4 px-2 mb-4 h-card">
                <ul class="box-shadow d-flex flex-column p-3 bg-dark text-light h-100">
                    <li>
                        <h4 class="p-2 h4">
                        <span><i class="fas fa-hashtag"></i></span>
                        ${hotel[index].Name}
                        </h4>
                    </li>
                    <li class="p-2">
                        <span class="d-inline-flex icon"
                        ><i class="mx-auto fas fa-phone"></i
                        ></span>
                        ${hotel[index].Tel}
                    </li>
                    <li class="p-2">
                        <span class="d-inline-flex icon"
                        ><i class="mx-auto fas fa-tag"></i
                        ></span>
                        ${hotel[index].Add}
                    </li>
                    <a class="btn mt-auto btn-info btn-block" href="#" role="button">詳細資訊</a>
                </ul>
            </div>
        `
    })
    hotelList.innerHTML = lists;
}
 

searchZone.addEventListener('click',getZoneAside,false)
selectZone.addEventListener('change', getZone, false);