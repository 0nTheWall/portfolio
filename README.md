# Portfolio

My personal site: who I am, my projects and what I'm working on this quarter.

- **React + Vite** front end, split into small components (`src/components/`).
- **Live project list** from the GitHub REST API (`src/hooks/useGitHubRepos.js`). If GitHub does not answer (offline, or over the 60 requests/hour limit for unauthenticated calls), it shows a saved snapshot from `src/data/fallback-repos.json` instead.
- **All personal content** is in `src/profile.js`, including extra details for each repo.
- **Unit tests** with Vitest for the repo-to-card logic (`src/lib/repos.test.js`).
- **Hosted** as a static site on Amazon S3.

## Run it

```bash
npm install
npm run dev      # local dev server with hot reload
npm test         # unit tests
npm run lint     # ESLint
npm run build    # production build into dist/
```

## Deploy to Amazon S3 (AWS Academy Learner Lab)

Live at http://aidan-ferriera-portfolio.s3-website-us-east-1.amazonaws.com

### With the deploy script

1. Start the Learner Lab, open **AWS Details → AWS CLI → Show**, copy the block, then save it with
   `mkdir -p ~/.aws && pbpaste > ~/.aws/credentials && chmod 600 ~/.aws/credentials`.
   These credentials expire when the lab session ends.
2. `npm run build && npm run deploy`

`scripts/deploy-s3.mjs` uses the AWS SDK to create the bucket if needed, turn off Block Public Access, enable static website hosting, add a public-read bucket policy and upload `dist/`. Pass a different bucket name with `npm run deploy -- my-bucket-name`.

### By hand in the AWS console

1. `npm run build`
2. Start the Learner Lab and open the AWS console, then go to **S3 → Create bucket**. Use a globally unique name, untick **Block all public access**, and confirm.
3. In the bucket, go to **Properties → Static website hosting → Enable**. Set both the index document and the error document to `index.html`.
4. Go to **Permissions → Bucket policy** and paste this, with your bucket name:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
     }]
   }
   ```

5. Go to **Objects → Upload** and add the *contents* of `dist/` (`index.html`, `favicon.svg` and the `assets` folder), not the `dist` folder itself.
6. The site's address is under **Properties → Static website hosting → Bucket website endpoint**.

To update the site, rebuild and upload the contents of `dist/` again.

## Refresh the saved snapshot

The snapshot only matters when GitHub is unreachable. To update it, save the output of
`https://api.github.com/users/0nTheWall/repos` over `src/data/fallback-repos.json`.
