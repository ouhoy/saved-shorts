import {htmlMarkup} from "../models/elements";




function $(id: string, selectAll: boolean = false){
    return selectAll ? (document.querySelectorAll(id)) : document.querySelector;
}

// interface SavedShortsUrl {
//     title: string,
//     creator: string,
//     url: string,
//     imgUrl: string,
//     date: Date
// }

const savedUrls: string[] = []

function waitForElement(selector: string) {

    return new Promise((resolve) => {

        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver((mutations) => {
            console.log("this is mutations:", mutations)
            if ($(selector)) {
                resolve($(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

    });
}

let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, {subtree: true, childList: true});

waitForElement("#like-button").then(() => {

    ($("#comments-button", true) as NodeListOf<Element>).forEach((buttonContainer, index) => {
        buttonContainer.parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
        console.log(index)

    })

});

waitForElement("#shorts-container").then((shortsContainer) => {

    // @ts-ignore
    shortsContainer.addEventListener("click", function (e) {

        const saveShortButton = e.target.closest(".save-short");

        if (saveShortButton) savedUrls.push(window.location.href)

        console.log(savedUrls)


    })

});


let initialLength = ($("#comments-button", true) as NodeList).length


function onUrlChange() {

    const newLength = ($("#comments-button", true) as NodeList).length
    if (initialLength === newLength) return;
    console.log("Rendered Again")
    // Render New Save Shorts Button Elements
    Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)
        .forEach((buttonContainer) => {
            buttonContainer.parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
        })

    initialLength = newLength;


}
