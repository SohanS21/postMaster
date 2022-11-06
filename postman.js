console.log('welcome to the postman');

let counter = 1;
//hiding paramerter field
let parameterbox = document.getElementById('parameterbox');
parameterbox.style.display = 'none';

//event listener to radio buttons
let json = document.getElementById('json');
let requestjsonbox = document.getElementById('requestJsonBox');
json.addEventListener('click', () => {
    parameterbox.style.display = 'none';
    requestJsonBox.style.display = 'block';
})

let customParams = document.getElementById('customParams');
customParams.addEventListener('click', () => {
    requestjsonbox.style.display = 'none';
    parameterbox.style.display = 'block';
})

//+button event listner
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let str = `<div class="row my-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${counter + 1}</label>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${counter + 1} key" id="parameterKey${counter+1}">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${counter + 1} value" id="parameterValue${counter+1}">
                </div>
                <div class="col"><button class="btn btn-primary subParam">-</button></div>
            </div>`;
    params.innerHTML += str;
    counter++;
    //-button event listner
    let subParam = document.getElementsByClassName('subParam');
    for (item of subParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })

    }
})

//event listner to submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //showing please wait in response box
    console.log('moshi')
    document.getElementById('responsePrism').innerHTML='Please wait.... fetching response';

    //fetch all the value that have entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='req']:checked").value;
    let contentType= document.querySelector("input[name='params']:checked").value;

    //if user select param instead of json collect all parameter in object
    if(contentType=='params'){
        data={};
        for (let i = 0; i < counter + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value=document.getElementById('parameterValue' + (i + 1)).value;
                data[key]=value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    //if the request type is get, invoke fetch api to get request
    if(requestType=='get'){
        fetch(url,{
            method:'GET'
        }).then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseText').value=text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll()
        })
    }
    else{
        fetch(url,{
            method:'GET',
            headers:{
                'content-type': "application/json; charset=UTF-8"
            }
        }).then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseText').value=text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll()
        })
    }

})
