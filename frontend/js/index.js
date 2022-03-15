const launchSelectElm = document.getElementById('launchesSelect');
const contentBody = document.getElementById('contentBody');

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
    launchData.map(({launch_site, launch_date_local},id)=>{
        const option = document.createElement("option");
        option.text = `${launch_site.site_name_long} | ${launch_date_local}`;
        option.value = id;
        launchSelectElm.appendChild(option)
    })
}

async function renderPage(index){
    const launchData = await getSpaceXData();
    const {
        id, 
        launch_date_local, 
        launch_site, 
        launch_year,
        links,
        mission_id,
        mission_name,
        rocket
    } = launchData[index];
    const imgArray = links.flickr_images;

    const launchSiteElm = document.createElement('div');
    launchSiteElm.classList.add('launchSite');
    const launchSite_H1 = document.createElement('h1');
    launchSite_H1.append(launch_site.site_name);
    launchSiteElm.append(launchSite_H1);

    const launchDate = document.createElement('div');
    launchDate.classList.add('launchDate');
    launchDate.append(`Launch Date: ${launch_date_local}`);

    const siteImages = document.createElement('div');
    siteImages.classList.add('siteImages');
    imgArray.map(src=>{
        const img = document.createElement('img');
        img.src = src;
        siteImages.append(img);
    });

    const siteLocation = document.createElement('div');
    siteLocation.classList.add('siteLocation');
    siteLocation.append(launch_site.site_name_long);


    const missionData = document.createElement('div');
    missionData.classList.add('missionData');
    const missionId = document.createElement('div');
    missionId.classList.add('missionId');
    missionId.append(mission_id[0]);
    const missionName = document.createElement('div');
    missionName.classList.add('missionName');
    missionName.append(mission_name);
    missionData.append(missionId, missionName);

    const rocketData = document.createElement('div');
    rocketData.classList.add('rocketData');
    const rocketName = document.createElement('div');
    rocketName.classList.add('rocketName');
    rocketName.append(rocket.rocket_name);
    const rocketType = document.createElement('div');
    rocketType.classList.add('rocketType');
    rocketType.append(rocket.rocket_type);
    rocketData.append(rocketName, rocketType);


    const linkContainer = document.createElement('div');
    linkContainer.classList.add('linkContainer');
    const link = document.createElement('a');
    link.href = links.article_link;
    link.target = '_blank';
    link.innerText = "Learn More";
    linkContainer.append(link);

    const mainBody = document.createElement('div');
    mainBody.append(
        launchSiteElm, 
        launchDate,
        siteImages,
        siteLocation,
        missionData,
        rocketData,
        linkContainer
    );

    contentBody.innerHTML = mainBody.innerHTML;

    return contentBody ;
}

launchSelectElm.addEventListener('change',async (e)=>{
    const index = e.target.value
    console.log(await renderPage(index));
})

renderSelectOptions()
// (async()=>{
//     console.log( await getSpaceXData())
// })();