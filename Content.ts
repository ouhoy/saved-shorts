import {htmlMarkup, inActiveSaveButtonSpan, activeSaveButtonSpan} from "./models/elements";
import {$} from "./controllers/helpers";
import {watchUrl, waitForElement, waitForBackgroundImage} from "./controllers/obsevers";

const savedShorts: ShortDetails[] = [];

chrome.storage.local.get(["savedShorts"]).then((result) => {
    savedShorts.push(...result.savedShorts);
});

class Short {
    private shorts: ShortDetails[] = [];

    constructor() {
        this.fillShortsArray();
    }

    add(short: ShortDetails) {
        if (this.exists(short.id)) return
        this.shorts.push(short)
        this.refresh()
        console.log("Short added", this.shorts);


    };

    remove(id: ShortDetails["id"]) {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        if (index !== -1) {
            this.shorts.splice(index, 1);
            this.refresh()

        }
    }

    exists(id: ShortDetails["id"]): boolean {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        return index !== -1;
    }

    private refresh() {
        chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            console.table(this.shorts)
        });
    }

    private fillShortsArray() {
        chrome.storage.local.get(["savedShorts"]).then((result) => {
            this.shorts.push(...result.savedShorts);
        });
    }
}

const short = new Short();


// Render Buttons on First Load
let initialLength: number;
waitForElement("#like-button").then(() => {

    const commentsButtons = ($("#comments-button", true) as NodeList)
    initialLength = commentsButtons.length;
    console.log(initialLength);
    commentsButtons.forEach(async (buttonContainer, index) => {
        (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

        const saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement

        if (index === 0) {
            const id = window.location.href.split("/")[4]
            if (short.exists(id)) {

                saveShortButton.setAttribute("saved-short", "true");
                if (saveShortButton.nextElementSibling !== null) {
                    saveShortButton.nextElementSibling.innerHTML = inActiveSaveButtonSpan;
                }
                saveShortButton.style.backgroundColor = "black";
            }
        }
        if (index) {

            const myElement = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement


            waitForBackgroundImage(myElement, (backgroundImage) => {
                const id = backgroundImage.split("/")[4];
                if (short.exists(id)) {
                    saveShortButton.setAttribute("saved-short", "true");
                    if (saveShortButton.nextElementSibling !== null) {
                        saveShortButton.nextElementSibling.innerHTML = inActiveSaveButtonSpan;
                    }
                    saveShortButton.style.backgroundColor = "black";
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
        const saveShortButtonTitle = (saveShortButton.nextElementSibling as HTMLElement)

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

            // Style Button
            saveShortButton.setAttribute("saved-short", `${!isSaved}`);
            saveShortButton.style.backgroundColor = isSaved ? "rgba(0, 0, 0, 0.05)" : "black";
            saveShortButtonTitle.innerHTML = isSaved ? activeSaveButtonSpan : inActiveSaveButtonSpan;

            isSaved ? short.remove(id) : short.add({title, creator, subscribed, id, date});


            // if (!isSaved) {
            //     console.log("Adding!");
            //     addUniqueObject(savedShorts, {title, creator, subscribed, id, date})
            //
            // }
            // if (isSaved) {
            //     console.log("Removing!");
            //     //TODO Remove the URL from the array object
            //     removeUniqueObject(savedShorts, id)
            // }


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

            const myElement = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement
            waitForBackgroundImage(myElement, (backgroundImage) => {
                console.log('Background image is now ready:', backgroundImage);
                // Perform your action here with the backgroundImage
            });
        })

    initialLength = newLength;


}

watchUrl(() => {

    if (location.href.split("/")[3] !== "shorts") {

        console.log(location.href)

    } else {
        console.log("Good Good hh!")
    }
})

watchUrl(onShortChange)
