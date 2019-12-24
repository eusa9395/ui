import {isEmpty, isNotEmpty, isObjectEmpty} from "../filter";
import http from "./http";


export default {
    fetchOptions: function (url, input, self, callback) {
        let paramsUrl = null;
        if (!self.withDisabled) {
            paramsUrl = "?deleteFlag=false";
        }
        let params = {};
        if(self && typeof self.buildParams === "function") {
            params = self.buildParams();
        }
        if (!isObjectEmpty(params)) {
            for (let paramName in params) {
                let paramValue = params[paramName];
                if (isNotEmpty(paramValue)) {
                    if (paramsUrl) {
                        paramsUrl += "&";
                    } else {
                        paramsUrl = "?";
                    }
                    paramsUrl +=paramName + "=" + paramValue;
                }
            }
        }
        if(self.filterSize > 0) {
            let hasInput = false;
            if (isNotEmpty(input) && input.length >= self.filterSize && (self.label == null || self.label !== input) && input !== self.value) {
                if (paramsUrl) {
                    paramsUrl += "&";
                } else {
                    paramsUrl = "?";
                }
                paramsUrl +=self.labelName + "=" + input;
                hasInput = true;
            }
            if(hasInput === false) {
                if(isNotEmpty(self.value)) {
                    if(paramsUrl) {
                        paramsUrl += "&";
                    } else {
                        paramsUrl = "?";
                    }
                    paramsUrl +=self.keyName + "=" + self.value;
                } else {
                    self.options = null;
                    return;
                }
            }
        }

        if (paramsUrl) {
            url += paramsUrl;
        }
        console.debug("url : " + url);

        let cache = null;

        if (cache == null || self.options === null || self.options === undefined) {
            http.get(url).then(response => {
                self.isLoading = false;
                self.options = response;
                if (self.label !== undefined) {
                    this.setLabel(self);
                }
                if(callback){
                    callback();
                }
            });
        }
    },
    setLabel(self) {
        if (self.options != null) {
            for (let i = 0; i < self.options.length; i++) {
                if (self.options[i][self.keyName] === self.value) {
                    self.label = self.options[i][self.labelName];
                    break;
                }
            }
        }
    }
}
