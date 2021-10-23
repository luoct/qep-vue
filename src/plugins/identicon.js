import Vue from 'vue'
import Identicon from 'identicon.js'

// const hash = "c157a79031e1c40f85931829bc5fc552";  // 15+ hex chars

// set up options
const options = {
    background: [255, 255, 255, 255],         // rgba white
    margin: 0.2,                              // 20% margin
    size: 64,                                // 420px square
    format: 'svg'                             // use SVG instead of PNG
};

// create a base64 encoded SVG
// const data = new Identicon(hash, options).toString();

// write to a data URI
// document.write('<img width=420 height=420 src="data:image/svg+xml;base64,' + data + '">');

Vue.prototype.Identicon = (hash) => {
    let dataURI = new Identicon(hash, options).toString()
    return 'data:image/svg+xml;base64,' + dataURI
}
