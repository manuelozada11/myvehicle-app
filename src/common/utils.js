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
    return `${ str.substr(0,1).toUpperCase() }${ str.substr(1, str.length) }`
}