import download from 'download';
import path from 'path';
import os from 'os';
import figures from 'figures';
import kleur from 'kleur'

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
        try {
            // TODO: Promise.all?
            await download(`https://localhapp.neocities.org/localh.app/${PEM}.html`, dirName, {
                filename: `${PEM}.pem`
            });
            const TEXT = `${figures.tick} ${PEM}`
            console.log(kleur.green().bold(TEXT));
        } catch (e) {
            const TEXT = `OOPS: ${e}`
            console.log(kleur.red().bold(TEXT));
        }
    }
}

export {
    downloadCerts
}