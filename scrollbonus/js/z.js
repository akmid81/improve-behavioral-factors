/*
import { getElem, createElem } from "./z.js";

getElem(selector/HTML_element, [coreSelector])
createElem(tag, [classList], [id])
 
elem.on(event,func) - addEventListener + .eventsArr
elem.delOn(event,func) - removeEventListener + .eventsArr
elem.eventsArr - events array
elem.del() - remove element from DOM & all event listeners
*/

//get HTML element + add new methods, getElem(selector/HTML element, coreSelector = document)
export function getElem(s, cS = document) {
   let e = (s instanceof HTMLElement) ? s : getElemFromSelector();

   if (e) {
      for (let k in z) e[k] = z[k];
   };

   function getElemFromSelector() {
      let cN = (!s || !cS || (typeof s != "string"))
         ? null : (cS == document)
            ? document : (getElem(cS));

      return (!cN) ? null : cN.querySelector(s);
   }

   return e;
}

//create HTML element with tag, classList, id
export function createElem(tag, classList = '', id = '') {
   let e = document.createElement(tag);
   if (classList != '') e.classList.add(classList);
   if (id != '') e.id = id;
   return getElem(e);
}

//new methods for HTML element
export let z = {
   //addEventListener + events array, elem.on(event,func)
   on(ev, f) {
      this.addEventListener(ev, f);

      if (this.eventsArr?.find(it => it[0] === ev && it[1] === f)) return;
      this.eventsArr = (this.eventsArr) ? [...this.eventsArr, [ev, f]] : [[ev, f]];

      return this
   },
   //removeEventListener + remove event from array
   delOn(ev, f) {
      let ind = this.eventsArr.findIndex(it => it[0] === ev && it[1] === f);
      if (ind < 0) return;

      this.removeEventListener(ev, f);
      this.eventsArr.splice(ind, 1);

      return this
   },
   //remove element from DOM & all event listeners
   del() {
      while (this.children.length) {
         getElem(this.children[0]).del();
      }

      let ev = this.eventsArr;
      while (ev && (ev.length != 0)) {
         let e = ev[ev.length - 1];
         this.delOn(e[0], e[1]);
      };
      this.remove();

      return this
   },
}