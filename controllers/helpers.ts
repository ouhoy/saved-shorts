export function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

export function addUniqueObject(array: SavedShortsUrl[], newObj: SavedShortsUrl) {
    const index = array.findIndex((obj: SavedShortsUrl) => obj.id === newObj.id);
    if (index === -1) array.push(newObj);
}

export function hey() {
    console.log("Hey?")
}