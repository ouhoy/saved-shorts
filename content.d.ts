declare interface ShortDetails {
    title: string,
    creator: string,
    id: string,
    subscribed: boolean,
    date: Date
}

declare type HandleSave = ([title, creator, subscribed]: string[], isSaved: boolean) => void