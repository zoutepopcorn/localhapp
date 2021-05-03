import {setApiServer, setGuiServer, startDns, startServer} from './index.js';

setGuiServer();
setApiServer();
startServer();
startDns();