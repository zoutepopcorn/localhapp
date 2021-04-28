import certInfo from 'cert-info';
import os from 'os';
import path from 'path';
import fs from 'fs';
import dayjs from "dayjs";
import figures from 'figures';
import kleur from 'kleur';

const DIR = path.join(os.homedir(), '.localh.app');

const getCertInfo = (certDir = DIR) => {
    let CERT;
    try {
        CERT = fs.readFileSync(path.join(certDir, 'cert.pem')).toString();
        const certJson = certInfo.info(CERT);
        const days = dayjs(certJson._expiresAt).diff(dayjs(), 'days');
        return `${kleur.green(figures.tick)} Current certificate is valid for the next ${kleur.green().bold(days)} days`;
    } catch (e) {
        console.log(e);
        return `${kleur.red(figures.cross)} Oops: ${kleur.red("No")} certificate, or ${kleur.red("invalid cert")} found`;
    }
}

export {
    getCertInfo
}