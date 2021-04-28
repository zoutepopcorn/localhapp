# What is this
    * This will download certificates from the https://localh.app domain. 
    * So the browser will see a valid certificate :D.
    * This is for testing only.

Usage
```javascript
import {downloadCerts} from '@localhapp/downnload/index.js';

downloadCerts().then(error => {
    if(error) {
        console.log("error")
    } else {
        console.log("okidoki");
    } 
})
```