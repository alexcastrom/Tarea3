// ==UserScript==
// @name         TrucoTarea3
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tarea Para Criptografía y Seguridad en Redes
// @author       Alex Castro
// @match        file:///home/alex/Desktop/Tarea3.html
// @require      https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.js
// @grant        none
// ==/UserScript==
var sr = document.createElement('script');//Aca va la magia
var l = document.createTextNode('function encrypt(msgString, key) {var iv = CryptoJS.lib.WordArray.random(16);var encrypted = CryptoJS.AES.encrypt(msgString, key, {iv: iv,mode: CryptoJS.mode.OFB});return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);};function decrypt(ciphertextStr, key) {key = CryptoJS.enc.Utf8.parse(key);var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);var iv = ciphertext.clone();iv.sigBytes = 16;iv.clamp();ciphertext.words.splice(0, 4);ciphertext.sigBytes -= 16;var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {iv: iv,mode: CryptoJS.mode.OFB});return decrypted.toString(CryptoJS.enc.Utf8);};');
sr.appendChild(l);
document.head.appendChild(sr);
//Verificador de que el plugin funciona bien
var tag = document.createElement("p");
var text = document.createTextNode("Utilizando plugin!!!!");
tag.appendChild(text);
var element = document.getElementById("after");
element.appendChild(tag);

//formulario para ingresar llave
var FN = document.createElement("input");
FN.setAttribute("type", "text");
FN.setAttribute("id", "key2");
FN.setAttribute("placeholder", "Introducir Llave");
element.appendChild(FN);

//Boton para activar alerta y mostrar mensaje descifrado
var s = document.createElement("input");
s.setAttribute("type", "submit");
s.setAttribute("value", "Descifrar!!");
s.setAttribute("onclick", "alert(decrypt(document.getElementsByClassName('algorithm')[0].id,document.getElementById('key2').value))");
element.appendChild(s);
