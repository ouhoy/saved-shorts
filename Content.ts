<<<<<<< HEAD
// // import {htmlMarkup} from "./models/elements";
//
//
// const htmlMarkup = ` <button style="
// margin-top: 8px;
// " class="yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button " aria-pressed="false" aria-label="Dislike this video" style=""><div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15895 20.0023C5.32221 20.0023 4.54031 19.586 4.07317 18.8918C3.30492 17.7502 3.31241 16.255 4.09205 15.1211L4.82045 14.0617L4.14538 12.4963C3.74297 11.5632 3.84031 10.4898 4.40399 9.64424L5.50013 8.00004L5.50013 6.00231C5.50013 4.89774 6.39557 4.00231 7.50014 4.00232L20.0001 4.00239C21.1047 4.0024 22.0001 4.89783 22.0001 6.0024L22.0001 19.1736C22.0001 20.0073 21.7396 20.8201 21.2551 21.4985L16.1368 28.6641C15.9224 28.9643 15.5279 29.0747 15.1888 28.9294C13.4238 28.1729 12.4653 26.2504 12.9234 24.3856L14.0001 20.0024L6.15895 20.0023ZM27 18.5001C28.1046 18.5001 29 17.6046 29 16.5001L29 6.00006C29 4.89549 28.1046 4.00006 27 4.00006L24 4.00006L24 18.5001L27 18.5001Z" class="style-scope yt-icon"></path></g></svg><!--css-build:shady--></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button>
//
// <div class="save-short yt-spec-button-shape-with-label__label"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Save</span></div>
// `;
//
// function $(id: string, selectAll: boolean = false): Element | NodeListOf<Element> {
//     return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
// }
//
// interface SavedShortsUrl {
//     title: string,
//     creator: string,
//     url: string,
//     imgUrl: string,
//     date: Date
// }
//
// const savedUrls: string[] = []
//
// function waitForElement(selector) {
//
//     return new Promise((resolve) => {
//
//         if ($(selector)) return resolve($(selector));
//
//         const observer = new MutationObserver((mutations) => {
//             if ($(selector)) {
//                 resolve($(selector));
//                 observer.disconnect();
//             }
//         });
//
//         observer.observe(document.body, {
//             childList: true,
//             subtree: true,
//         });
//
//     });
// }
//
// let lastUrl = location.href;
// new MutationObserver(() => {
//     const url = location.href;
//     if (url !== lastUrl) {
//         lastUrl = url;
//         onUrlChange();
//     }
// }).observe(document, {subtree: true, childList: true});
//
// waitForElement("#like-button").then(() => {
//
//     ($("#comments-button", true) as NodeListOf<Element>).forEach((buttonContainer, index) => {
//         buttonContainer.parentNode.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
//
//     })
//
// });
//
// waitForElement("#shorts-container").then((shortsContainer) => {
//
//     // @ts-ignore
//     shortsContainer.addEventListener("click", function (e) {
//
//         const saveShortButton = e.target.closest(".save-short");
//
//         if (saveShortButton) savedUrls.push(window.location.href)
//
//         console.log(savedUrls)
//
//
//     })
//
// });
//
//
// let initialLength = ($("#comments-button", true) as NodeList).length
//
//
// function onUrlChange() {
//
//     const newLength = ($("#comments-button", true) as NodeList).length
//     if (initialLength === newLength) return;
//     console.log("Rendered Again")
//     // Render New Save Shorts Button Elements
//     Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)
//         .forEach((buttonContainer) => {
//             buttonContainer.parentNode.children[2].insertAdjacentHTML("beforeend", htmlMarkup)
//         })
//
//     initialLength = newLength;
//
//
// }
=======
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
>>>>>>> parent of 390a730 (Render Buttons On Scroll)
