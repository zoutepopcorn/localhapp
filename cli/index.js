import prompts from 'prompts';
import {downloadCerts} from '../download/index.js';
import {getCertInfo} from '../cert-info/index.js';

console.clear();

console.log(getCertInfo());

const PICK = {
    type: 'select',
    name: 'value',
    message: 'What do you want?',
    choices: [
        {title: 'download certs', description: '', value: 'download'},
        {title: 'start gui', value: 'gui'},
    ],
    initial: 0
}

const showCertInfo = () => {

}


const start = async () => {
    const response = await prompts(PICK);
    if (response.value === "download") {
        const err = await downloadCerts();
    }
    if (response.value === "gui") {
        console.log("todo");
    }
}


start();