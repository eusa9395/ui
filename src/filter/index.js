import moment from "moment";

// 空值过滤器
export function nullValFilter(value) {
    return (value === null || value === undefined) ? 'null' : value;
}

export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }
    if (value.length === 0) {
        return true;
    }
    return value instanceof String && value.trim().length === 0;

}

export function isNotEmpty(value) {
    return !isEmpty(value);
}

// 日期格式化
export function date(value) {
    if (value) {
        return moment(value).format("YYYY-MM-DD");
    }
    return '';
}

// 日期-时间 格式化
export function yearmonth(value) {
    if (value) {
        return moment(value).format("YYYY-MM");
    }
    return '';
}

// 日期-时间 格式化
export function datetime(value) {
    if (value) {
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
    return '';
}

// 日期-时间 格式化
export function year(value) {
    if (value) {
        return moment(value).format("YYYY");
    }
    return '';
}

// 字符串截取
export function substring(value, start, end) {
    if (value) {
        return value.substr(start, end);
    }
    return '';
}

// 截取 '/' 后面的字符串
export function substringAfter(value) {
    let separator = '/';
    if (!value) {
        return '';
    }
    if (!separator) {
        return '';
    }
    let pos = value.indexOf(separator);
    if (pos === -1) {
        return '';
    }
    return value.substring(pos + separator.length);
}

