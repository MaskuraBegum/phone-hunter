const loadPhn = async (searchText,isShow) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phns = data.data;
    dataShow(phns,isShow)
}

const dataShow = (phns,isShow) => {
    const phncards = document.getElementById('phone-cards')
    phncards.textContent = '';
    const showId = document.getElementById('show-all');

    //console.log(showId);
    if(phns.length > 5 && !isShow){
        showId.classList.remove('hidden');
        
    }
    else{
        showId.classList.add('hidden');
    }

    if(!isShow){
        phns = phns.slice(0,6)
    }
    phns.forEach(phnoe => {
        //console.log(phns);
        const newPhnCard = document.createElement('div');
        newPhnCard.classList = `card p-4 bg-base-100 shadow-xl`;
        newPhnCard.innerHTML = `
        <figure><img src="${phnoe.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phnoe.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
         <button onclick="showdetails('${phnoe.slug}'); my_modal_5.showModal()" class="btn btn-primary">Show details</button>
        </div>
    </div>
        `
    phncards.appendChild(newPhnCard);
    });
    loadingData(false);
}

function serchHandle(isShow){
    loadingData(true);
    const searchText = document.getElementById('input-text').value;
    loadPhn(searchText,isShow);
}

function loadingData (isLoading){
    const load = document.getElementById('loading')
    if(isLoading){
        load.classList.remove('hidden');
    }
    else{
        load.classList.add('hidden');
    }
}
 function showingAll (){
    serchHandle(true);
 }

 const showdetails = async (id) =>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
    document.getElementById('show-phone-details').innerHTML = `
    <div class="flex justify-center border-2">
        <img src="${data.data.image}"  alt="Shoes class="p-4" />
    </div>
        <p class="text-2xl">Name:${data.data.name}</p>
        <p class="text-sm">storage:${data.data.mainFeatures.storage}</p>
        <p class="text-sm">displaySize:${data.data.mainFeatures.displaySize}</p>
        <p class="text-sm">Name:${data.data.mainFeatures.chipSet}</p>
    `
 }