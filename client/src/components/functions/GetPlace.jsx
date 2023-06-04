function getPlace(wilaya,daira,baladia){
    fetch('https://raw.githubusercontent.com/othmanus/algeria-cities/master/json/ar/algeria_cities.json')
    .then(res=> res.json())
    .then(data => {
        let wilayat = document.querySelector(`.${wilaya}`);
        data.forEach((element,i) => {
            let optExiste = false;
            document.querySelectorAll(`.${wilaya} option`).forEach(opt => {
                if (opt.innerHTML === element.wilaya_name && !optExiste) {
                    optExiste = true;
                }
            })
            if (!optExiste) {
                wilayat.innerHTML += `<option value="${element.wilaya_name}" >${element.wilaya_name}</option>`
            }
        });
        let dairat = document.querySelector(`.${daira}`);
        wilayat.onblur = () => {
            dairat.innerHTML = "<option selected >إختر دائرة</option>";
            data.forEach((ele)=>{
                if (ele.wilaya_name === wilayat.value) {
                    let optExiste = false ;
                    document.querySelectorAll(`.${daira} option`).forEach(opt => {
                        if (opt.innerHTML === ele.daira_name && !optExiste) {
                            optExiste = true;
                        }
                    })
                    if (!optExiste) {
                        dairat.innerHTML += `<option value="${ele.daira_name}" >${ele.daira_name}</option>`
                    }
                }
            });
        };
        let baladiat = document.querySelector(`.${baladia}`);
        dairat.onblur = () => {
            baladiat.innerHTML = "<option selected >إختر بلدية</option>";
            data.forEach((ele)=>{
                if (ele.daira_name === dairat.value && ele.wilaya_name === wilayat.value) {
                    baladiat.innerHTML += `<option value="${ele.commune_name}" >${ele.commune_name}</option>`
                }
            });
        };
    })
}

export default getPlace;