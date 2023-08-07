// import {htmlMarkup, savedElement} from "./models/elements";
// import {$, addUniqueObject} from "./controllers/helpers";


const elements = {
    htmlMarkup: ` <button style="margin-top: 8px; " class="yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button " saved-short="false"  aria-pressed="false" aria-label="Dislike this video" style=""><div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15895 20.0023C5.32221 20.0023 4.54031 19.586 4.07317 18.8918C3.30492 17.7502 3.31241 16.255 4.09205 15.1211L4.82045 14.0617L4.14538 12.4963C3.74297 11.5632 3.84031 10.4898 4.40399 9.64424L5.50013 8.00004L5.50013 6.00231C5.50013 4.89774 6.39557 4.00231 7.50014 4.00232L20.0001 4.00239C21.1047 4.0024 22.0001 4.89783 22.0001 6.0024L22.0001 19.1736C22.0001 20.0073 21.7396 20.8201 21.2551 21.4985L16.1368 28.6641C15.9224 28.9643 15.5279 29.0747 15.1888 28.9294C13.4238 28.1729 12.4653 26.2504 12.9234 24.3856L14.0001 20.0024L6.15895 20.0023ZM27 18.5001C28.1046 18.5001 29 17.6046 29 16.5001L29 6.00006C29 4.89549 28.1046 4.00006 27 4.00006L24 4.00006L24 18.5001L27 18.5001Z" class="style-scope yt-icon"></path></g></svg><!--css-build:shady--></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button><div class="save-short yt-spec-button-shape-with-label__label"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Save</span></div>
`,
    savedElement: `<span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Saved</span>`
}
const {htmlMarkup, savedElement} = elements;


function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

function addUniqueObject(array: SavedShortsUrl[], newObj: SavedShortsUrl) {
    const index = array.findIndex((obj: SavedShortsUrl) => obj.id === newObj.id);
    if (index === -1) array.push(newObj);
    chrome.storage.local.set({savedShorts: array}).then(() => {
        console.log("Value is set");
        console.table(savedShorts)

    });


}

function removeUniqueObject(array: SavedShortsUrl[], id: string) {
    const index = array.findIndex((obj: SavedShortsUrl) => obj.id === id);
    if (index !== -1) {
        array.splice(index, 1);

        chrome.storage.local.get(["savedShorts"]).then((result) => {

            result.savedShorts.splice(index, 1)
            console.table(result.savedShorts)
        });
    }

}

function checkForId(array: SavedShortsUrl[], id: string): boolean {
    const index = array.findIndex((obj: SavedShortsUrl) => obj.id === id);
    return index !== -1;
}

const savedShorts: SavedShortsUrl[] = [{
    title: "When your friend tries to SNEAK you into THEIR gym",
    creator: "@EdwardSo",
    subscribed: true,
    id: "vtDyDVs4Kkk",
    date: new Date()
}];

function waitForElement(selector: string) {

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

function waitForBackgroundImage(element: HTMLElement, callback: (backgroundImage: string) => void) {
    const observer = new MutationObserver((mutationsList, observer) => {
        const backgroundImage = getComputedStyle(element).backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            observer.disconnect();
            callback(backgroundImage);
        }
    });
    observer.observe(element, {attributes: true, attributeFilter: ['style']});
}

/*-------------------------------------------------------------------------*/
//                          OPERATIONS                                     //
/*-------------------------------------------------------------------------*/


// Observe URL Change
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onShortChange();
    }
}).observe(document, {subtree: true, childList: true});

// Render Buttons on First Load
let initialLength: number;
waitForElement("#like-button").then(() => {

    initialLength = ($("#comments-button", true) as NodeList).length;
    console.log(initialLength);
    ($("#comments-button", true) as NodeListOf<Element>).forEach(async (buttonContainer, index) => {
        (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);
        if (index === 0) {
            const id = window.location.href.split("/")[4]
            if (checkForId(savedShorts, id)) {

                // @ts-ignore
                document.querySelectorAll("#like-button > button")[index].nextElementSibling.innerHTML = savedElement;
                // @ts-ignore
                document.querySelectorAll("#like-button > button")[index].style.backgroundColor = "black";
            }
        }
        if (index) {
            const myElement = (($("#like-button > button", true) as NodeListOf<Element>)[index].parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.children[1] as HTMLElement);
            waitForBackgroundImage(myElement, (backgroundImage) => {
                const id = backgroundImage.split("/")[4];
                if (checkForId(savedShorts, id)) {

                    // @ts-ignore
                    document.querySelectorAll("#like-button > button")[index].nextElementSibling.innerHTML = savedElement;
                    // @ts-ignore
                    document.querySelectorAll("#like-button > button")[index].style.backgroundColor = "black";
                }

            });
        }
    });


});


// Add Click Event To Buttons
waitForElement("#shorts-container").then((shortsContainer) => {

    // @ts-ignore
    shortsContainer.addEventListener("click", function (e) {

        const saveShortButton = e.target.closest(".save-short") as HTMLElement;


        // TODO Make Its Own Function ^^

        if (saveShortButton) {
            //TODO Fix This
            const shortDetails = (saveShortButton?.parentElement?.parentElement?.parentElement?.querySelector("#overlay") as HTMLElement).innerText.split("\n")
            const title: string = shortDetails[0];
            const creator: string = shortDetails[1];
            const subscribed: boolean = shortDetails[2] === "Subscribed";
            const id: string = window.location.href.split("/")[4];
            const date = new Date();


            const isSaved = saveShortButton.getAttribute("saved-short") === "true";

            if (!isSaved) {
                saveShortButton.setAttribute("saved-short", "true");
                (saveShortButton.nextElementSibling as HTMLElement).innerHTML = savedElement;
                saveShortButton.style.backgroundColor = "black";

                addUniqueObject(savedShorts, {title, creator, subscribed, id, date})

            } else {
                saveShortButton.setAttribute("saved-short", "false");
                (saveShortButton.nextElementSibling as HTMLElement).innerHTML = savedElement.replace("Saved", "Save");
                saveShortButton.style.backgroundColor = "rgba(0, 0, 0, 0.05)";

                //TODO Remove the URL from the array object
                removeUniqueObject(savedShorts, id)
            }


            console.log(savedShorts)


        }


    })


});


function onShortChange() {


    // Watch Rendered Shorts Length
    const newLength = ($("#comments-button", true) as NodeList).length
    if (initialLength === newLength) return;


    // Render New Save Shorts Button Elements
    Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)
        .forEach((buttonContainer, index) => {
            (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup)

            const myElement = (($("#like-button > button", true) as NodeListOf<Element>)[index].parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.children[1] as HTMLElement);
            waitForBackgroundImage(myElement, (backgroundImage) => {
                console.log('Background image is now ready:', backgroundImage);
                // Perform your action here with the backgroundImage
            });
        })

    initialLength = newLength;


}



