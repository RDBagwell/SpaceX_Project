// Get Parent HTML Elements
const launchSelectElm = document.getElementById('launchesSelect');
const contentBody = document.getElementById('contentBody');

// Fetch Data
async function fetchSpaceXData(){
    const spaceXJson = await fetch('../../data/spacex.json');
    return await spaceXJson.json();
}

async function getSpaceXData(){
    const {data} = await fetchSpaceXData();
    return data.launches;
}

// Render Select Element
async function renderSelectOptions() {
    const launchData = await getSpaceXData();
    launchData.map(({launch_site, launch_date_local},id)=>{
        const option = document.createElement("option");
        option.text = `${launch_site.site_name_long} | ${launch_date_local}`;
        option.value = id;
        launchSelectElm.appendChild(option)
    })
}

// Render Main Body
async function renderPage(index){
    // Gather launch data and get it ready for render
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

    // Create HTML for Site Name
    const launchSiteElm = document.createElement('div');
    launchSiteElm.classList.add('launchSite');
    const launchSite_H1 = document.createElement('div');
    launchSite_H1.append(`Site Name: ${launch_site.site_name}`);
    launchSiteElm.append(launchSite_H1);

    // Create HTML for Site Name Long
    const siteLocation = document.createElement('div');
    siteLocation.classList.add('siteLocation');
    siteLocation.append(`Site Name Long: ${launch_site.site_name_long}`);

    // Create HTML for Site Launch Date
    const launchDate = document.createElement('div');
    launchDate.classList.add('launchDate');
    launchDate.append(`Launch Date: ${launch_date_local}`);

    // Create HTML for Images
    const siteImages = document.createElement('div');
    siteImages.classList.add('siteImages');
    if(imgArray.length == 0){
        const img = document.createElement('img');
        img.src =  'https://via.placeholder.com/300x300?text=No+Image+Available';
        siteImages.append(img);
    } else {
        imgArray.map(src=>{
            const img = document.createElement('img');
            img.src = src;
            siteImages.append(img);
        });
    }

    // Create HTML for Misson Data ie Mission ID & Mission Name
    const missionData = document.createElement('div');
    missionData.classList.add('missionData');
    const missionId = document.createElement('div');
    missionId.classList.add('missionId');
    missionId.append(`Mission ID: ${mission_id[0] || ""}`);
    const missionName = document.createElement('div');
    missionName.classList.add('missionName');
    missionName.append(`Mission Name: ${mission_name}`);
    missionData.append(missionId, missionName);

    // Create HTML for Rocket Data ie Rocket Name & Rocket Type
    const rocketData = document.createElement('div');
    rocketData.classList.add('rocketData');
    const rocketName = document.createElement('div');
    rocketName.classList.add('rocketName');
    rocketName.append(`Rocket Name: ${rocket.rocket_name}`);
    const rocketType = document.createElement('div');
    rocketType.classList.add('rocketType');
    rocketType.append(`Rocket Type: ${rocket.rocket_type}`);
    rocketData.append(rocketName, rocketType);

    // Create HTML Learn More Link
    const linkContainer = document.createElement('div');
    linkContainer.classList.add('linkContainer');
    const link = document.createElement('a');
    link.href = links.article_link;
    link.target = '_blank';
    link.innerText = "Learn More";
    linkContainer.append(link);

    // Gather All HTML and store it in a div for main body
    const mainBody = document.createElement('div');
    mainBody.append(
        launchSiteElm,
        siteLocation, 
        launchDate,
        siteImages,
        missionData,
        rocketData,
        linkContainer
    );

    // Render main body
    contentBody.innerHTML = mainBody.innerHTML;
}

launchSelectElm.addEventListener('change',async (e)=>{
    const index = e.target.value;
    if(index > -1){
        await renderPage(index);
    } else{
        contentBody.innerHTML = '';
    }
})

renderSelectOptions()
