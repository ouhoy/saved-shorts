import {$, insertSaveButton, addClickEventToButtons} from "./controllers/helpers";
import {watchUrl, waitForElement} from "./controllers/obsevers";


export class Short {
    private shorts: ShortDetails[] = [];

    constructor() {
         if (!this.shorts.length) {
            this.fillShortsArray();
        }
    }

    add(short: ShortDetails) {
        if (this.exists(short.id)) return
        this.shorts.push(short)
        this.refresh()
    };

    read(id: ShortDetails["id"]): ShortDetails | boolean {

        // If !id return this.shorts object as ShortDetails[]
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        return this.exists(id) ? this.shorts[index] : false

    }

    remove(id: ShortDetails["id"]) {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        if (index !== -1) {
            this.shorts.splice(index, 1);
            this.refresh()

        }
    }

     exists  (id: ShortDetails["id"]): boolean | number {
        if (!this.shorts.length) {
            this.fillShortsArray();
        }
        console.log("Before: ", this.shorts)
        const index = this.shorts.findIndex((obj: ShortDetails) => {
            console.log(obj.id, id)

            return obj.id === id
        });
        console.log("After: ", this.shorts)
        console.log(id, index)
        console.log(index !== -1)

        return index !== -1;
    }

    private refresh() {
        chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            console.table(this.shorts)
        });
    }

    private fillShortsArray() {
        if (!chrome.storage.local.get(["savedShorts"])) {
            chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            });

        }
      
        chrome.storage.local.get(["savedShorts"]).then((result) => {
            this.shorts.push(...result.savedShorts);
        });
    }
}

export const short = new Short();

// Render Buttons on First Load
let initialLength = 0;

function onFirstLoad() {
    waitForElement("#like-button").then(() => {

        const commentsButtons = ($("#comments-button", true) as NodeList)
        initialLength = commentsButtons.length;

        commentsButtons.forEach(async (buttonContainer, index) => {


            let saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement

            if (saveShortButton) return;

            insertSaveButton(buttonContainer, index);

        });


    });
}


onFirstLoad()

addClickEventToButtons();

function onShortChange() {

    if (location.href.split("/")[3] !== "shorts") return;

    if (initialLength === 0) return onFirstLoad();

    // Watch Rendered Shorts Length
    const newLength = ($("#comments-button", true) as NodeList).length

    if (initialLength === newLength && initialLength !== 0) return;

    const commentsButtons = Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)

    // Render New Save Shorts Button Elements
    commentsButtons.forEach((buttonContainer, index) => {
        insertSaveButton(buttonContainer, index);
    })

    initialLength = newLength;


}

watchUrl(() => {

    if (location.href.split("/")[3] !== "shorts") {

        console.log(location.href)
        initialLength = 0;

    } else {
        console.log("Good Good hh!");
    }
})

watchUrl(onShortChange)
