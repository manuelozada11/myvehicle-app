import es from "../translate/es.json";
import en from "../translate/en.json";

export const scrollToTop = (value) => window.scrollTo({ behavior: 'smooth', top: value})

export const removeItemStorage = (key) => {
    sessionStorage.removeItem(key);
}

export const setStorageValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getStorageValue = (key) => {
    if (!key) return null;

    const data = sessionStorage.getItem(key);

    if (!data) return null;
    
    return JSON.parse(data);
}

export const firstLetterUppercase = (value) => {
    if (!value) return '';

    const str = value.toString();
    return `${ str.substr(0,1).toUpperCase() }${ str.substr(1, str.length).toLowerCase() }`
}

export const dateFormat = (date) => {
    return `${new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: "medium" }).format(new Date(date))}`;
}

export const orderBy = (array, by) => {
    if (!array) return [];

    if (by === 'date') 
        return array.sort((a, b) => {
            if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
            else if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;

            return 0
        });
}

export const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export const translate = (value) => {
    const lang = window.navigator.language?.split("-")[0];

    switch (lang) {
        case "es":
            return es[value];
        default:
            return en[value];
    }
}