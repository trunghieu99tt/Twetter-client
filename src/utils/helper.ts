import { SyntheticEvent } from "react";

//@ts-ignore
import TinyURL from "tinyurl";

const nFormatter = (num: number, digits: number = 2) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
};

const formatNumber = (value: any) => {
    return (value && (value as number).toLocaleString("en-US")) || "0";
};

const randomDate = (start: any, end: any, startHour: any, endHour: any) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
};

const getDaysDiffBetweenDates = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
};

const urlify = (text: string) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
};

const isEqual = (objA: any, objB: any) =>
    JSON.stringify(objA) === JSON.stringify(objB);

const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const calcDiffTimeString = (date: Date): string => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    const diff = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diff < 60) {
        return `${diff} seconds ago`;
    }
    if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes ago`;
    }
    if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hours ago`;
    }

    return date.toLocaleDateString();
};

// Parse the tweet to extract hashtags and the first url ( for the link's preview )
export const extractMetadata = (body: string) => {
    let hashtags = body.match(/(#[\w]+)/g);
    const urls = body.match(/https?:\/\/\S+/g);

    let tags: string[] = [];

    // Remove duplicates and the hash
    if (hashtags && hashtags?.length > 0) {
        tags = Array.from(new Set(hashtags)).map((h) => h.toString().substr(1));
    }
    return {
        hashtags: tags,
        urls,
    };
};

export const shortenURLS = async (
    urls: string[]
): Promise<{ original: string; shorten: string }[]> => {
    const tinyURLS = [];
    for (let url of urls) {
        const res = await TinyURL.shorten(url);
        tinyURLS.push({
            original: url,
            shorten: res,
        });
    }
    return tinyURLS;
};

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

export {
    formatNumber,
    randomDate,
    getDaysDiffBetweenDates,
    urlify,
    isEqual,
    validateEmail,
    nFormatter,
    calcDiffTimeString,
};
