async function sendGetRequest(url) {
    let params = {
        method: 'Get',
        mode: 'cors'
    };

    let response = await fetch(url, params);
    if(response.ok) {
        let data = await response.json();
        return data;
    }
    else {
        throw Error(response.status);
    }
};

async function sendPostRequest(url, data) {
    let params = {
        method: 'Post',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    //console.log(params)
    let response = await fetch(url, params);
    if(response.ok) {
        //alert("response good")
        let data = await response.json();
        console.log(data)
        return data;
    }
    else {
        throw Error(response.status);
    }
};

export {sendGetRequest, sendPostRequest};