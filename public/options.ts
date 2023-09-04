function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

const resetButton = $(".reset") as HTMLElement;


chrome.storage.local.get(["savedShorts"]).then((result) => {
    const numberOfShorts = result.savedShorts.length;
    ($("nav") as HTMLElement).insertAdjacentHTML("afterend", `<p class="saved-shorts-number">${numberOfShorts >= 1 ? numberOfShorts : ""} ${numberOfShorts > 1 ? "Shorts" : numberOfShorts === 1 ? "Short" : "No shorts were saved yet"}</p>`);
    result.savedShorts.forEach((short: ShortDetails) => {

        const shortHTML = `<div class="short-container"><div class="short" style="background-image:url(https://i.ytimg.com/vi/${short.id}/frame0.jpg);" >
          <div class="short-links-container">
               <div class="short-links">
                           <img style="display: none" class="remove-short" src="assets/icons/Close_MD.svg" alt="Remove Short">

            <a title="Play the video in a new tab." target="_blank" href="https://www.youtube.com/shorts/${short.id}">
                <img src="assets/icons/More_Vertical.svg" alt="Link">
            </a>
        </div>  
        </div>
   
       <div class="short-info-container">
         <div class="short-info">
            <div class="title"> <a title="Play the video in a new tab." target="_blank" href="https://www.youtube.com/shorts/${short.id}"><p class="short-title">${short.title}</p></a></div>
            <div class="about-creator">
                <div class="creator-avatar">
                <img style="display: none" src="./assets/icons/yt-user.png" alt="${short.creator}"/>
                </div>
                <div class="creator-name"><a target="_blank" href="https://www.youtube.com/${short.creator}"><p>${short.creator}</p></a></div>
            </div>
        </div>
        </div>
      
</div></div>`;


        ($(".shorts") as HTMLElement).insertAdjacentHTML("beforeend", shortHTML)
    })


});


resetButton.addEventListener("click", () => {

    chrome.storage.local.set({savedShorts: []}).then(() => {
    });
})