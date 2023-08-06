export function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

export function addUniqueObject(array: SavedShortsUrl[], newObj: SavedShortsUrl) {
    const index = array.findIndex((obj: SavedShortsUrl) => obj.url === newObj.url);
    if (index === -1) array.push(newObj);
}