getCovidWorld();
getCovidCountry();
getSelectCountry(); 
statistic();
const btnSelect = document.getElementById("select_world");
btnSelect.addEventListener("click",getCountryById);
function getCountryById(e){
    console.log(e.target.value);
    
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/'+ e.target.value )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let id = data.location.id;
        let code = data.location.country_code;
        let quocgia = data.location.country;
        let tinh = data.location.province;
        let danso = data.location.country_population;
        let capnhap = data.location.last_updated;
        let canhiem = data.location.latest.confirmed;
        let tuvong = data.location.latest.deaths;
        let hoiphuc = data.location.latest.recovered;
        
        document.getElementById("quocgia").innerHTML = quocgia;
        document.getElementById("code").innerHTML = code;
        document.getElementById("danso").innerHTML = danso;
        document.getElementById("canhiem").innerHTML = canhiem;
        document.getElementById("tuvong").innerHTML = tuvong;
        document.getElementById("hoiphuc").innerHTML = hoiphuc;
        document.getElementById("capnhap").innerHTML = capnhap.substring(0,10);
        document.getElementById("phantram").innerHTML = ((Number(tuvong)/Number(canhiem))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
        if(data.location.province!=""){
            document.getElementById("title").innerText = quocgia + '-' + tinh;
        }else{
            document.getElementById("title").innerText = quocgia;
        }
    }).catch(error => console.log('Error'));
}
function getCovidCountry(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/274')
    .then(res => res.json())
    .then(data => {
        
        let id = data.location.id;
        let code = data.location.country_code;
        let quocgia = data.location.country;
        let danso = data.location.country_population;
        let capnhap = data.location.last_updated;
        let canhiem = data.location.latest.confirmed;
        let tuvong = data.location.latest.deaths;
        let hoiphuc = data.location.latest.recovered;
        
        document.getElementById("quocgia").innerHTML = quocgia;
        document.getElementById("code").innerHTML = code;
        document.getElementById("danso").innerHTML = danso;
        document.getElementById("canhiem").innerHTML = canhiem;
        document.getElementById("tuvong").innerHTML = tuvong;
        document.getElementById("hoiphuc").innerHTML = hoiphuc;
        document.getElementById("capnhap").innerHTML = capnhap.substring(0,10);
        document.getElementById("phantram").innerHTML = ((Number(tuvong)/Number(canhiem))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
        
    }).catch(error => console.log('Error'));
}
function getCovidWorld(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
    .then(res => res.json())
    .then(data => {
        const html = data.locations.map(covid => {
            const id = covid.id;
            const code = covid.country_code;
            const quocgia = covid.country;
            const tinh = covid.province
            const danso = covid.country_population;
            const capnhap = covid.last_updated.substring(0,10);
            const canhiem = covid.latest.confirmed;
            const tuvong = covid.latest.deaths;
            const hoiphuc = covid.latest.recovered;
            const phantram = ((Number(tuvong)/Number(canhiem))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

            return `
            <ul class="list_world">
            <li>
              <p>id: ${id}</p>
              <p style="color:red">Quốc gia: ${quocgia}</p>
              <p style="color:blue">${tinh}</p>
              <p>Dân số: ${new Intl.NumberFormat().format(danso)}</p>
              <p>Cập nhập: ${capnhap} </p>
              <p>Ca nhiễm: ${new Intl.NumberFormat().format(canhiem)} </p>
              <p>Tử vong: ${new Intl.NumberFormat().format(tuvong)} </p>
              <p>Phần trăm: ${phantram} </p>
            </li>
            </ul>
            `
        }).join("");
        document.getElementById("list").insertAdjacentHTML("afterbegin",html);
    }).catch(error => console.log('Error'));
  
}
function getSelectCountry(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
    .then(res => res.json())
    .then(data => {
        
        const html = data.locations.map(list => {
            const id = list.id;
            const quocgia = list.country;
            var option = document.createElement('option');
            option.value = id;
            option.innerHTML = quocgia;
            if(list.province!=""){
                option.innerHTML = quocgia + '-' +list.province;
            }else{
                option.innerHTML = quocgia;
            }
            document.getElementById("select_world").appendChild(option);

            
        });
        
    }).catch(error => console.log('Error'));
}
function statistic(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
    .then(res => res.json())
    .then(data => {
        let tongcanhiem = data.latest.confirmed;
        let tongtuvong = data.latest.deaths;
        let tongphuchoi = data.latest.recovered;
        document.getElementById("tongcanhiem").innerText= new Intl.NumberFormat().format(tongcanhiem)+ " ca";
        document.getElementById("tongtuvong").innerText= new Intl.NumberFormat().format(tongtuvong) + " ca";
        document.getElementById("tongphuchoi").innerText= new Intl.NumberFormat().format(tongphuchoi) + " ca";
        
    }).catch(error => console.log('Error'));
}