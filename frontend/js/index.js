const launchSelectElm = document.getElementById('launchesSelect')

async function fetchSpaceXData(){
    const spaceXJson = await fetch('../../data/spacex.json');
    return await spaceXJson.json();
}

async function getSpaceXData(){
    const {data} = await fetchSpaceXData();
    return data.launches;
}

async function renderSelectOptions() {
    const launchData = await getSpaceXData();
    launchData.map(({id, launch_site, launch_date_local})=>{
        const option = document.createElement("option");
        option.text = `${launch_site.site_name_long} | ${launch_date_local}`;
        option.value = id;
        launchSelectElm.appendChild(option)
    })
}

async function renderPage(index){
    return index;
}

launchSelectElm.addEventListener('change',async (e)=>{
    const index = e.target.value
    console.log();
})

renderSelectOptions()
// (async()=>{
//     console.log( await getSpaceXData())
// })();