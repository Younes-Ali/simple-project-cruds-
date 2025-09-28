let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads_cost = document.getElementById('ads_cost');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let delAll = document.getElementById('delAll');
let del = document.getElementById('del');
let up = document.getElementById('up');
let delsec = document.getElementById('delsec');
let totalItems = document.getElementById('totalItems');
let upbtn = document.getElementById('upbtn');
let search = document.getElementById('search');

let moodSerch = 'Title';
let moodC_U = 'create';

let temp ;

window.onscroll = function(){    
    if(scrollY >= 200){
        upbtn.classList.remove('hidden');
    }
    else{
        upbtn.classList.add('hidden');
    }
}

function toUp(){
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function getTotal(){

    if(price.value == ''){
        total.innerHTML = '';
        total.style.background = '#b91c1c';
    }
    else{
        total.innerHTML = +price.value + +taxes.value + +ads_cost.value - +discount.value;
        total.style.background = '#040';
    }
}

let dataPro;
if(localStorage.products == null){
    dataPro = [];
}
else{
    dataPro = JSON.parse(localStorage.products);
}

showProductes();

function checkEmpty(){
    if(moodC_U == 'create'){
    if( title.value == '' ||
        price.value == '' ||
        count.value == '' ||
        category.value == ''
    ){
        return true;
    }
    else{
        return false;
    }
    }
    else{
        if( title.value == '' ||
            price.value == '' ||
            category.value == ''
        ){
            return true;
        }
        else{
            return false;
        }
    }
}

function makeEmpty(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads_cost.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.background = '#b91c1c';
}

submit.onclick = function(){
    if(!checkEmpty()){
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads_cost : ads_cost.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    if(moodC_U == 'create'){
    if(newPro.count > 1){
        for(let i =0; i < newPro.count;i++ ){
            dataPro.push(newPro);
        }
    }
    else{
        dataPro.push(newPro);
    }
    }
    else{
        dataPro[temp] = newPro;
        moodC_U = 'create';
        submit.innerHTML = 'Create';
        count.classList.remove("hidden");
    }
    localStorage.setItem('products',JSON.stringify(dataPro));
    }
    else{
        window.alert('please enter all data (Title, Price, Count, Category)');
    }
    makeEmpty();
    showProductes();
}


function showProductes(){
    let item = '';
    let i = 0;
    for(i; i < dataPro.length; i++){
        item += `
            <tr>
                <td class="border-2 border-black p-1">${i+1}</td>
                <td class="border-2 border-black p-1">${dataPro[i].title}</td>
                <td class="border-2 border-black p-1">${dataPro[i].price}</td>
                <td class="border-2 border-black p-1">${dataPro[i].taxes}</td>
                <td class="border-2 border-black p-1">${dataPro[i].ads_cost}</td>
                <td class="border-2 border-black p-1">${dataPro[i].discount}</td>
                <td class="border-2 border-black p-1">${dataPro[i].total}</td>
                <td class="border-2 border-black p-1">${dataPro[i].category}</td>
                <td class="border-2 border-black p-1"><button id="up" onclick="upItem(${i})" class="bg-cyan-600 p-1 w-full rounded-2xl hover:bg-cyan-500 text-black text-lg font-bold">Update</button></td>
                <td class="border-2 border-black p-1"><button id="del" onclick="delItem(${i})" class="bg-red-800 p-1 w-full rounded-2xl hover:bg-red-700 text-black text-lg font-bold">Delete</button></td>
            </tr>
        `;
    }
    if(dataPro.length != 0){
        delsec.classList.remove("hidden");
        totalItems.innerHTML = i;
    }
    else{
        delsec.classList.add("hidden");
    }
    document.getElementById('tbody').innerHTML = item;
}

function delItem(i){
    dataPro.splice(i,1);
    localStorage.products = JSON.stringify(dataPro);
    showProductes();
}

function upItem(i){
    moodC_U = 'update';
    scroll({
        top:0,
        behavior:"smooth",
    })
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads_cost.value = dataPro[i].ads_cost;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.classList.add("hidden");
    submit.innerHTML = 'Update';
    temp = i ;
}

delAll.onclick = function(){
    localStorage.clear();
    dataPro.splice(0);
    showProductes();
    delsec.classList.add("hidden");
}

function getSearchMood(id){
    if(id == 'searchByTitle'){
        moodSerch = 'Title';
    }
    else{
        moodSerch = 'Category';
    }
    search.placeholder = 'Search By '+moodSerch;
    search.focus();
    search.value = '';
    showProductes();
}

function searchItem(value){
    let item = '';
    for(let i = 0; i < dataPro.length; i++){
        if(moodSerch == 'Title'){       
                if(dataPro[i].title.includes(value)){
                    item += `
                    <tr>
                        <td class="border-2 border-black p-1">${i+1}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].title}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].price}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].taxes}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].ads_cost}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].discount}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].total}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].category}</td>
                        <td class="border-2 border-black p-1"><button id="up" onclick="upItem(${i})" class="bg-cyan-600 p-1 w-full rounded-2xl hover:bg-cyan-500 text-black text-lg font-bold">Update</button></td>
                        <td class="border-2 border-black p-1"><button id="del" onclick="delItem(${i})" class="bg-red-800 p-1 w-full rounded-2xl hover:bg-red-700 text-black text-lg font-bold">Delete</button></td>
                    </tr>
                `;
            }
        }
        else{
                if(dataPro[i].category.includes(value.toLowerCase())){
                    item += `
                    <tr>
                        <td class="border-2 border-black p-1">${i+1}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].title}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].price}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].taxes}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].ads_cost}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].discount}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].total}</td>
                        <td class="border-2 border-black p-1">${dataPro[i].category}</td>
                        <td class="border-2 border-black p-1"><button id="up" onclick="upItem(${i})" class="bg-cyan-600 p-1 w-full rounded-2xl hover:bg-cyan-500 text-black text-lg font-bold">Update</button></td>
                        <td class="border-2 border-black p-1"><button id="del" onclick="delItem(${i})" class="bg-red-800 p-1 w-full rounded-2xl hover:bg-red-700 text-black text-lg font-bold">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = item;
}

