const { BskyAgent } = require ('@atproto/api');
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';
import { promises as fs } from 'fs';
const path = require('path');

dotenv.config();
const filePath = path.join(__dirname, 'public', 'img', 'GWRaCraWwAAzlr8.jpg')
const image = filePath;
const encoding = 'image/jpeg';

async function readFileAsUint8Array(filePath: string): Promise<Uint8Array> {
    try {
        const buffer = await fs.readFile(filePath);
        return new Uint8Array(buffer);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro reading the file:', error.message);
        } else {
            console.error('Unknown Error while reading the file:', error);
        }
        throw error;
    }
}

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
})

const username = process.env.BLUESKY_USERNAME;
const password = process.env.BLUESKY_PASSWORD

export async function main() {
    try {

        await agent.login({ identifier: username, password: password});

        if (!username || !password) {
            throw new Error('Variables BLUESKY_USERNAME e BLUESKY_PASSWORD not defined');
        }

        const fileData = await readFileAsUint8Array(image)
        
        const { data } = await agent.uploadBlob(fileData, { encoding });

        if (!data || !data.blob) {
            throw new Error('UploadBlob does not contain expected blob');
        }

        await agent.post({
            text: "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨",
            embed: {
                $type: 'app.bsky.embed.images',
                images: [
                    {
                        alt: 'Imagem de um mico leão dourado com as palavras: MEIA NOITE!!, HORÁRIO OFICIAL DO ÓLEO DE MACACO',
                        image: data.blob,
                        aspecRatio: {
                            width: 1000,
                            height: 500
                        }
                    }
                ],
            },
            createdAt: new Date().toISOString()
        });
        console.log("Just posted!")
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error while executing main function:', error.message);
        } else {
            console.error('Unknown Error while executing main function:', String(error));
        }
    }
}

main();


// Run this on a cron job
// const scheduleExpression = '0 0 * * *'; // Run every day at midnight

// const job = new CronJob(scheduleExpression, main); 

// job.start();