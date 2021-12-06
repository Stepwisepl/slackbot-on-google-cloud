# About
This is a [Stepwise] "Tech Tuesday" demo app showing how to build a Slackbot with [Google Cloud Function].

## Bootstrap project (copied from [Google Cloud Functions with Typescript])

1. Use [gts](https://github.com/google/gts) to configure Typescript.

    ```sh
    npx gts init
    ```

2. Install the required packages:

    ```sh
    npm install @google-cloud/functions-framework
    npm install @types/express concurrently nodemon --save-dev
    ```

3. Add a `start` script to `package.json`, passing in the `--source` flag to
   point to the compiled code directory (configured by `gts` in this example).
   Also add a `watch` script to use for development:

    ```
      "scripts": {
        "start": "functions-framework --source=build/src/ --target=helloWorld",
        "watch": "concurrently \"tsc -w\" \"nodemon --watch ./build/ --exec npm run start\"",
        ...
      }
    ```

4. Replace the contents of `src/index.ts` with:

    ```ts
    import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

    export const helloWorld: HttpFunction = (req, res) => {
      res.send('Hello, World');
    };
    ```

5. Start the built-in local development server in watch mode:

    ```sh
    npm run watch
    ```

   This will continuously watch changes to your TypeScript project and recompile when changes are detected:

    ```sh
    [12:34:56 AM] Starting compilation in watch mode...
    [12:34:57 AM] Found 0 errors. Watching for file changes.
    ...
    Serving function...
    Function: helloWorld
    URL: http://localhost:8080/
    ```

## Create Slack app 

(No coding yet)
1) Open https://api.slack.com/  and [Create an app](https://api.slack.com/apps?new_app=1)
2) Select "From Scratch" and Fill App Name and workspace
3) Select `Slash commands` and `Create New Command`
4) Fill `Create New Command` form with:  
Command: `/stepwise`  
Request Url: `https://not-valid.yet` (we will get url later on and update it)  
Short Description: `Tech tuesday demo bot`  
  
5) Install the app to your workspace

## Start Development

1. Fill `index.ts` with following code:
```typescript
import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';


export const handleRequest: HttpFunction = (req, res) => {
   const command = req.body.text
   res.send(`Command: '${command}'`);
};
```

2. Run function locally with:
```
npm run watch
```
3. Run [ngrok] to create tunnel to your local machine:  
```
ngrok http 8080
```

4. Copy https link from output of ngrok and use it as Slackbot command request url (See [Create Slack app](#create-slack-app) section)

5. Try running `/stepwise test` in your Slack. You should get following in response: 
```text
Command: test
```

Having such setup you can debug app locally.


## Deploy it to Google Cloud Function

1. Create project  
```gcloud projects create tech-tuesday-cloud-functions --folder=252221710142 --name="Tech Tuesday Cloud Functions" --set-as-default```

2. Enable billing  
```gcloud alpha billing projects link tech-tuesday-cloud-functions2 --billing-account=<yourBillingAccount>```

3. Enable Cloud Build  
```gcloud services enable cloudbuild.googleapis.com```

4. Deploy Function  
```gcloud functions deploy stepwiseBot --runtime nodejs16 --trigger-http --allow-unauthenticated --region=europe-central2```

5. Copy https link from output of ngrok and use it as Slackbot command request url (See [Create Slack app](#create-slack-app) section)
   [link text itself]
6. Cleanup :)  
```gcloud projects delete tech-tuesday```

[Google Cloud Functions with Typescript]: https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/typescript.md
[Google Cloud Function]: https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/typescript.md
[ngrok]: https://ngrok.com/
[Stepwise]: https://stepwise.pl





