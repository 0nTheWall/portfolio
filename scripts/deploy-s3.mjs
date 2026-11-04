// Deploys dist/ to an S3 bucket configured for static website hosting.
// Usage: npm run build && npm run deploy [-- bucket-name]
// Credentials come from ~/.aws/credentials (Learner Lab → AWS Details → AWS CLI → Show).
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutPublicAccessBlockCommand,
  PutBucketWebsiteCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

const bucket = process.argv[2] ?? 'aidan-ferriera-portfolio'
const region = 'us-east-1'
const distDir = path.resolve(import.meta.dirname, '../dist')
const s3 = new S3Client({ region })

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

async function ensureBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }))
    console.log(`Using existing bucket ${bucket}`)
  } catch (err) {
    if (err.$metadata?.httpStatusCode === 403) {
      throw new Error(`Bucket name "${bucket}" belongs to another account. Pass a different name: npm run deploy -- my-unique-name`)
    }
    if (err.$metadata?.httpStatusCode !== 404) throw err
    await s3.send(new CreateBucketCommand({ Bucket: bucket }))
    console.log(`Created bucket ${bucket}`)
  }
}

async function makePublicWebsite() {
  await s3.send(new PutPublicAccessBlockCommand({
    Bucket: bucket,
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: false,
      IgnorePublicAcls: false,
      BlockPublicPolicy: false,
      RestrictPublicBuckets: false,
    },
  }))
  await s3.send(new PutBucketWebsiteCommand({
    Bucket: bucket,
    WebsiteConfiguration: {
      IndexDocument: { Suffix: 'index.html' },
      ErrorDocument: { Key: 'index.html' },
    },
  }))
  await s3.send(new PutBucketPolicyCommand({
    Bucket: bucket,
    Policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${bucket}/*`,
      }],
    }),
  }))
  console.log('Enabled static website hosting with public read access')
}

async function uploadDist() {
  const files = await readdir(distDir, { recursive: true, withFileTypes: true })
  for (const file of files.filter(f => f.isFile())) {
    const fullPath = path.join(file.parentPath, file.name)
    const key = path.relative(distDir, fullPath).split(path.sep).join('/')
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: await readFile(fullPath),
      ContentType: CONTENT_TYPES[path.extname(key)] ?? 'application/octet-stream',
      // Hashed asset filenames never change content, so they can be cached; index.html must stay fresh.
      CacheControl: key.startsWith('assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    }))
    console.log(`Uploaded ${key}`)
  }
}

try {
  await ensureBucket()
  await makePublicWebsite()
  await uploadDist()
  console.log(`\nLive at http://${bucket}.s3-website-${region}.amazonaws.com`)
} catch (err) {
  console.error(`Deploy failed: ${err.message}`)
  process.exitCode = 1
}
