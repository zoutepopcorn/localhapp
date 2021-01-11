import download from 'download';
import path from 'path';
import os from 'os';

const DIR = path.join(os.homedir(), '.localh.app');
const CERT_NAMES = [
    "bundle",
    "cert",
    "chain",
    "fullchain",
    "privkey",
]

const downloadCerts = async (dirName = DIR) => {
    console.log("download CERTS in: ", dirName);
    for (const PEM of CERT_NAMES) {
        await download(`https://localhapp.neocities.org/localh.app/${PEM}.html`, dirName, {
            filename: `${PEM}.pem`
        });
        console.log("download ", PEM);
    }
}

export {
    downloadCerts
}