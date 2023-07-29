import {htmlMarkup} from "./models/elements";

function $(id, selectAll = false) {
    return selectAll ? document.querySelectorAll(id) : document.querySelector(id);
}

function waitForElement(selector) {

    return new Promise((resolve) => {

        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver((mutations) => {
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

    $("#comments-button", true).forEach(buttonContainer => {
        buttonContainer.parentNode.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
    })

});

waitForElement("#shorts-container").then((shortsContainer) => {

    // @ts-ignore
    shortsContainer.addEventListener("click", function (e) {

    const saveShortButton = e.target.closest(".save-short");

    if (saveShortButton) console.log(window.location.href)


})

});



let initialLength = $("#comments-button", true).length


function onUrlChange() {

    const newLength = $("#comments-button", true).length
    if (initialLength === newLength) return;

    Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength).forEach((buttonContainer) => {
        buttonContainer.parentNode.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
    })

    initialLength = newLength;


}
