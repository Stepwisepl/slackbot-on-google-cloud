import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';


export const handleRequest: HttpFunction = (req, res) => {
    const command = req.body.text
    res.send(`Command: '${command}'`);
};