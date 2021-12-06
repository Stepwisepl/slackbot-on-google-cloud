import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';


export const helloWorld: HttpFunction = (req, res) => {
    const command = req.body.text
    res.send(`Command: '${command}'`);
};