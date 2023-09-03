function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

const resetButton = $(".reset") as HTMLElement;


chrome.storage.local.get(["savedShorts"]).then((result) => {


    result.savedShorts.forEach((short: ShortDetails) => {

        const shortHTML = `<div class="short-container" title="${short.title}"><div class="short" style="background-image:url(https://i.ytimg.com/vi/${short.id}/frame0.jpg);" >
       <div class="short-info-container">
         <div class="short-info">
            <div class="title"><p class="short-title">${short.title}</p></div>
            <div class="about-creator">
                <div class="creator-avatar">
                <img src="./assets/icons/yt-user.png" alt="${short.creator}"/>
                </div>
                <div class="creator-name"><p>${short.creator}</p></div>
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