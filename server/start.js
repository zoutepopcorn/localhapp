import {setApiServer, setGuiServer, startDns, startServer, getLocalIp} from './index.js';

getLocalIp().then((localIp) => {
    console.log('localIp ', localIp);
    setGuiServer();
    setApiServer();
    startServer();
    startDns(localIp);
})
