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
        this.shorts.unshift(short)
        this.refresh()
    };

    // read(id: ShortDetails["id"]): ShortDetails | boolean {
    //
    //     // If !id return this.shorts object as ShortDetails[]
    //     const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
    //     return this.exists(id) ? this.shorts[index] : false
    //
    // }
    //
    read() {
        console.log(this.shorts)
        return this.shorts

    }

    remove(id: ShortDetails["id"]) {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        if (index !== -1) {
            this.shorts.splice(index, 1);
            this.refresh()

        }
    }

    exists(id: ShortDetails["id"]): boolean | number {
        if (!this.shorts.length) {
            this.fillShortsArray().then();
        }

        const index = this.shorts.findIndex((obj: ShortDetails) => {

            return obj.id === id
        });


        return index !== -1;
    }

    private refresh() {
        chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            console.table(this.shorts)
        });
    }

    private async fillShortsArray() {
        if (!await chrome.storage.local.get(["savedShorts"])) {
            await chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            });
            return
        }

        await chrome.storage.local.get(["savedShorts"]).then((result) => {this.shorts.push(...result.savedShorts);
        });
        return;
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
        onFirstLoad()
        console.log("Good Good hh!");
    }
})

watchUrl(onShortChange)
