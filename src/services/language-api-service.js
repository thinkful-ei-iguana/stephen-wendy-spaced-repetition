import TokenService from "./token-service";
import config from "../config";

const LanguageApiService = {
  getLanguage() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => 
      !res.ok  ? res.json().then(e => Promise.reject(e)) : res.json()
    )
  },

  getNext(guess) {
    return fetch(`${config.API_ENDPOINT}/language/guess`)
      
  }
};
export default LanguageApiService;
