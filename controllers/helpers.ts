export function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

export function addUniqueObject(array: ShortDetails[], newObj: ShortDetails) {
    const index = array.findIndex((obj: ShortDetails) => obj.id === newObj.id);
    if (index === -1) {
        array.push(newObj);
        chrome.storage.local.set({savedShorts: array}).then((result) => {

        });
    }
}

export function removeUniqueObject(array: ShortDetails[], id: string) {
    const index = array.findIndex((obj: ShortDetails) => obj.id === id);
    if (index !== -1) {
        array.splice(index, 1);

      chrome.storage.local.set({savedShorts: array}).then((result) => {

        });
    }

}

export function checkForId(array: ShortDetails[], id: string): boolean {
    const index = array.findIndex((obj: ShortDetails) => obj.id === id);
    return index !== -1;
}