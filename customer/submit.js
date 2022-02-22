function previewOrder() {
    var myHeaders = new Headers();
    myHeaders.append("token", "6f6f997c-761a-11ec-ac64-422c37c6de1b");
    myHeaders.append("shop_id", "84736");
    myHeaders.append("Content-Type", "application/json");

    // fetch('./Data.json')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log(error));

    let selectProduct = window.productList[document.getElementById('inputProduct').value]; 
    console.log(selectProduct);
    var raw = JSON.stringify({
        "payment_type_id": 2,
        "note": document.getElementById("inputNote").value,
        "required_note": "KHONGCHOXEMHANG",
        "to_name": document.getElementById("inputName").value,
        "to_phone": document.getElementById("inputPhoneNumber").value,
        "to_address": document.getElementById("inputAddress").value,
        "to_ward_code": document.getElementById("inputWard").value,
        "to_district_id": document.getElementById("inputDistrict").value,
        "cod_amount": selectProduct.price + 40000,
        "weight": selectProduct.weight,
        "length": selectProduct.length,
        "width": selectProduct.width,
        "height": selectProduct.height,
        "service_id": Math.floor(document.getElementById("inputServiceType").value / 10),
        "service_type_id": document.getElementById("inputServiceType").value % 10,
        "items": [
            {
                "name": selectProduct.name,
                "quantity": 1,
                "price": selectProduct.price
            }
        ]
    });

    console.log("request: " + raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/preview", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.code >=400 && result.code < 600) {
                alert(result.message);
            }
            else {

                let data = result.data;
                console.log(JSON.stringify(data));
                // print preview json
                var previewJson = document.getElementById('previewJson');
                data.total_fee += selectProduct.price;
                previewJson.textContent = JSON.stringify(data, null, 2);
            }
        })
        .catch(error => console.log('error', error));
};

function createOrder() {
    var myHeaders = new Headers();
    myHeaders.append("token", "6f6f997c-761a-11ec-ac64-422c37c6de1b");
    myHeaders.append("shop_id", "84736");
    myHeaders.append("Content-Type", "application/json");

    // fetch('./Data.json')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log(error));

    let selectProduct = window.productList[document.getElementById('inputProduct').value]; 
    console.log(selectProduct);
    var raw = JSON.stringify({
        "payment_type_id": 2,
        "note": document.getElementById("inputNote").value,
        "required_note": "KHONGCHOXEMHANG",
        "to_name": document.getElementById("inputName").value,
        "to_phone": document.getElementById("inputPhoneNumber").value,
        "to_address": document.getElementById("inputAddress").value,
        "to_ward_code": document.getElementById("inputWard").value,
        "to_district_id": document.getElementById("inputDistrict").value,
        "cod_amount": selectProduct.price,
        "weight": selectProduct.weight,
        "length": selectProduct.length,
        "width": selectProduct.width,
        "height": selectProduct.height,
        "service_id": Math.floor(document.getElementById("inputServiceType").value / 10),
        "service_type_id": document.getElementById("inputServiceType").value % 10,
        "items": [
            {
                "name": selectProduct.name,
                "quantity": 1,
                "price": selectProduct.price,
                "weight": selectProduct.weight,
            }
        ]
    });

    console.log("request: " + raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/preview", requestOptions)
        .then(previewRes => previewRes.json())
        .then(previewRes => {
            if (previewRes.code >=400 && previewRes.code < 600) {
                alert(previewRes.message);
            }
            else {
                requestOptions.body.cod_amount += previewRes.data.total_fee;
                fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.code >=400 && result.code < 600) {
                        alert(result.message);
                    }
                    else {
        
                        let data = result.data;
                        console.log(JSON.stringify(data));
                        // print preview json
                        var previewJson = document.getElementById('previewJson');
                        // data.assign("_STATUS", "ORDER CREATED, USE THIS CODE BELOW TO GET ORDER DETAIL");
                        data.total_fee += selectProduct.price;
                        document.getElementById('orderWarning').textContent = "Order has been created, Order code: " + data.order_code;
                        previewJson.textContent = JSON.stringify(data, null, 2);
                    }
                })
                .catch(error => console.log('error', error));
            }
        })
        .catch(error => console.log('error', error));
};