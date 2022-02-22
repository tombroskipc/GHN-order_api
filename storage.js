var myHeaders = new Headers();
myHeaders.append("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0");
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Token", "9e5c810e-9140-11ec-ac64-422c37c6de1b");
myHeaders.append("shop_id", "84736");
myHeaders.append("ShopID", "84736");
myHeaders.append("x-request-id", "00c3ccf8-23de-48be-b136-deab9f186b81");
myHeaders.append("Origin", "https://5sao.ghn.dev");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Referer", "https://5sao.ghn.dev/");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "cross-site");
myHeaders.append("Cache-Control", "max-age=0");
myHeaders.append("TE", "trailers");

var raw = JSON.stringify({
  "shop_id": 0,
  "source": "5sao"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/count-order-by-status", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));