import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  myCipher = null;
  myDecipher = null;

  constructor(@Inject('systemConfig') public SystemConfig) {
    this.myCipher = this.cipher(this.SystemConfig.cipherKey || 'j13FGw39L');
    this.myDecipher = this.decipher(this.SystemConfig.cipherKey || 'j13FGw39L');
  }

  setData(key: string, data: any) {
    const _data = this.myCipher(JSON.stringify(data));
    localStorage.setItem(key, _data);
  }

  getData(key: string) {
    let _data = 'undefined';
    _data = localStorage.getItem(key);
    if (_data && _data != 'undefined') {
      if (!this.chipperChecker(_data)) {
        return JSON.parse(this.myDecipher(_data));
      } else {
        return JSON.parse(_data);
      }
    } else {
      return null;
    }
  }

  flush(key: string) {
    localStorage.removeItem(key);
  }

  cipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0));
    let byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
    let applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return text =>
      text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  };

  decipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0));
    let saltChars = textToChars(salt);
    let applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded =>
      encoded
        .match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
  };

  chipperChecker(item: string) {
    try {
      JSON.parse(item);
      return true;
    } catch (error) {
      return false;
    }
  }
}
