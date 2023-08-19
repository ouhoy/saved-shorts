function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

const resetButton = $(".reset") as HTMLElement;


chrome.storage.local.get(["savedShorts"]).then((result) => {

    const shortsContainer = $(".shorts") as HTMLElement;
    result.savedShorts.forEach((short: ShortDetails) => {
        const shortHTML = `<iframe width="370" height="658" src="https://www.youtube.com/embed/${short.id}" title="${short.title}" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                                    picture-in-picture; web-share" allowfullscreen></iframe>`;

        shortsContainer.insertAdjacentHTML("beforeend", shortHTML)
    })
});

resetButton.addEventListener("click", () => {
    console.log("Clicked!")
    chrome.storage.local.set({savedShorts: []}).then(() => {

        console.log("OK!")

    });
})