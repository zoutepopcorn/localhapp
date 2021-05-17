#!/usr/bin/env node
import prompts from 'prompts';
import {downloadCerts} from '@localhapp/downnload/index.js';
import {getCertInfo} from '@localhapp/cert-info/index.js';
import os from 'os';
import * as fs from 'fs/promises';
import path from 'path';

const HOME = path.join(os.homedir(), '.localh.app');
const CWD = path.join(process.cwd(), '.localh.app');

const PICK = {
    type: 'select',
    name: 'value',
    message: 'Where do you want your certs download?',
    choices: [
        {title: `${HOME}`, value: HOME},
        {title: `${CWD}`, description: '', value: CWD},
        {title: `custom folder`, description: '', value: 'custom'},
        {title: `quit`, description: '', value: 'quit'}
    ],
    initial: 0
}
const CUSTOM = {
    type: 'text',
    name: 'value',
    message: `Custom path`
}

const customFolder = async () => {
    const customResponse = await prompts(CUSTOM);
    try {
        try {
            await fs.stat(customResponse.value);
        } catch (e) {
            console.log("oops no folder");
            process.exit();
        }
    } catch (e) {
        console.log("error ", e);
    }
}

const start = async () => {
    console.clear();
    console.log();
    console.log(getCertInfo());
    console.log();

    const response = await prompts(PICK);
    if (response.value.startsWith('/')) {
        try {
            await downloadCerts(response.value);
            console.log(getCertInfo());
        } catch (e) {
            console.log(e);
        }
    }
    if (response.value === "custom") {
        customFolder();
    }
    if (response.value === "quit") {
        process.exit();
    }
}

start().then(() => {
})