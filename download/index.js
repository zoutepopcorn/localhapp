import download from 'download';
import path from 'path';
import os from 'os';
import figures from 'figures';
import kleur from 'kleur';

const ROOT = `https://h0i.herokuapp.com/certs`; // https://localhapp.neocities.org/localh.app
const EXT = "pem"

const DIR = path.join(os.homedir(), '.localh.app');
const CERT_NAMES = [
    "bundle",
    "cert",
    "chain",
    "fullchain",
    "privkey",
]

const downAndLog = async (PEM, DIR) => {
    try {
        // const URL = `https://i.picsum.photos/id/308/200/200.jpg?hmac=gCyOH3yDZDvlNeCodWo0et9Vw3peGSCuMsQBRNqgHJQ`;
        const URL = `https://h0i.herokuapp.com/certs/${PEM}.pem`
        // const PATH = `/home/popcorn/WebstormProjects/webserver/localhapp/test.certs/`
        //path.join(__dirname, "test.certs")
        console.log("DIR ", DIR);
        await download(URL, DIR, {filename: `${PEM}.pem`})
        const SUCCESS = `${figures.tick} ${PEM}.pem`;
        console.log(kleur.green().bold(SUCCESS));
    } catch {
        const FAIL = `${figures.cross} ${PEM}.pem`;
        console.log(kleur.red().bold(FAIL));
    }
}

const hasError = (output) => {
    let fail = false;
    for (const item of output) {
        if(item.status === "rejected") {
            fail = true;
            break;
        }
    }
    return fail;
}

const downloadCerts = async (dirName = DIR) => {
    console.log("download CERTS in: ", dirName);
    const toDownload = [];
    for (const PEM of CERT_NAMES) {
        toDownload.push(downAndLog(PEM, dirName));
    }
    const output = await Promise.allSettled(toDownload);
    return hasError(output);
}

export {
    downloadCerts
}