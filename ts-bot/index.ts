const { BskyAgent } = require ('@atproto/api');
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';
import { promises as fs } from 'fs';

dotenv.config();

const image = './public/img/GWRaCraWwAAzlr8.jpg';
const encoding = 'image/jpg';

async function readFileAsUint8Array(filePath: string): Promise<Uint8Array> {
    const buffer = await fs.readFile(filePath);
    return new Uint8Array(buffer);
}

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
})


export async function main() {
    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!});

    const fileData = await readFileAsUint8Array(image)
    
    const { data } = await agent.uploadBlob(fileData, { encoding });

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
}

// main();


// Run this on a cron job
// const scheduleExpression = '0 0 * * *'; // Run every day at midnight

// const job = new CronJob(scheduleExpression, main); 

// job.start();