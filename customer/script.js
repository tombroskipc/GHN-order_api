function getDistrict() {
    let provinceId = document.getElementById('inputProvince').value;
    console.log("provinceId: " + provinceId);
    var myHeaders = new Headers();
    myHeaders.append("token", "6f6f997c-761a-11ec-ac64-422c37c6de1b");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let data = result.data;
            console.log(data);
            // add options to inputWard
            var inputDistrict = document.getElementById('inputDistrict');
            for (element of data) {
                var option = document.createElement('option');
                option.value = element.DistrictID;
                option.text = element.DistrictName;
                inputDistrict.appendChild(option);
            }

        })
        .catch(error => console.log('error', error));
}

function getWard() {
    let districtId = document.getElementById('inputDistrict').value;
    console.log("districtId: " + districtId);
    var myHeaders = new Headers();
    myHeaders.append("token", "6f6f997c-761a-11ec-ac64-422c37c6de1b");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let data = result.data;
            console.log(data);
            // add options to inputWard
            var inputWard = document.getElementById('inputWard');
            for (element of data) {
                var option = document.createElement('option');
                option.value = element.WardCode;
                option.text = element.WardName;
                inputWard.appendChild(option);
            }
        })
        .catch(error => console.log('error', error));
}

function getService() {
    // WardCode 520113
    let wardCode = document.getElementById('inputDistrict').value;
    var myHeaders = new Headers();
    myHeaders.append("token", "6f6f997c-761a-11ec-ac64-422c37c6de1b");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "shop_id": 84736,
        "from_district": 1544,
        "to_district": Number(wardCode)
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services", requestOptions)
        .then(response => response.json())  
        .then(result => {
            console.log(result);
            let data = result.data;
            console.log(data);
            // add options to inputServiceType
            var inputServiceType = document.getElementById('inputServiceType');
            for (element of data) {
                var option = document.createElement('option');
                option.value = element.service_id * 10 + element.service_type_id;
                option.text = element.short_name;
                inputServiceType.appendChild(option);
            }
        })
        .catch(error => console.log('error', error));
}

function showProduct() {
    let selectedProduct = document.getElementById('inputProduct').value;
    document.getElementById('previewProduct').textContent = JSON.stringify(window.productList[selectedProduct], null, 2);
}