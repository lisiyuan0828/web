const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mime = require('mime-types')
require('dotenv').config({ path: '.env.local' })

// 从命令行参数获取环境
const env = process.argv[2] || 'test'
const validEnvs = ['test', 'prod']

if (!validEnvs.includes(env)) {
  console.error(`❌ 无效的环境参数: ${env}`)
  console.error(`✅ 有效值: ${validEnvs.join(', ')}`)
  process.exit(1)
}

// 根据环境选择对应的 Bucket
const bucketEnvKey = env === 'test' ? 'COS_BUCKET_TEST' : 'COS_BUCKET_PROD'
const bucket = process.env[bucketEnvKey]

// COS 配置
const config = {
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
  Bucket: bucket,
  Region: process.env.COS_REGION
}

// 验证配置
console.log('🔍 环境变量检查：')
console.log(`   环境: ${env}`)
console.log(`   Bucket Key: ${bucketEnvKey}`)
console.log(`   COS_SECRET_ID: ${config.SecretId ? '已设置 ✓' : '未设置 ✗'}`)
console.log(`   COS_SECRET_KEY: ${config.SecretKey ? '已设置 ✓' : '未设置 ✗'}`)
console.log(`   ${bucketEnvKey}: ${config.Bucket || '未设置 ✗'}`)
console.log(`   COS_REGION: ${config.Region || '未设置 ✗'}`)
console.log('')

if (!config.SecretId || !config.SecretKey || !config.Bucket || !config.Region) {
  console.error('❌ 缺少 COS 配置，请检查环境变量：')
  console.error(`   COS_SECRET_ID, COS_SECRET_KEY, ${bucketEnvKey}, COS_REGION`)
  console.error('   请在 .env.local 文件中配置或设置为环境变量')
  process.exit(1)
}

// 初始化 COS
const cos = new COS({
  SecretId: config.SecretId,
  SecretKey: config.SecretKey
})

// 上传配置
const distDir = path.resolve(__dirname, '../dist')
const cosPrefix = 'web/' // COS 路径前缀

console.log('📦 开始上传到 COS...')
console.log(`📁 本地目录: ${distDir}`)
console.log(`🌐 COS 路径: ${cosPrefix}`)
console.log(`🪣 COS Bucket: ${config.Bucket}`)
console.log(`📍 COS Region: ${config.Region}`)
console.log('')

// 获取所有文件
const files = glob.sync('**/*', {
  cwd: distDir,
  nodir: true,
  dot: true
})

if (files.length === 0) {
  console.error('❌ dist 目录为空或不存在！')
  console.error(`   检查路径: ${distDir}`)
  process.exit(1)
}

console.log(`📊 找到 ${files.length} 个文件`)
console.log('📄 文件列表:')
files.slice(0, 10).forEach(f => console.log(`   - ${f}`))
if (files.length > 10) {
  console.log(`   ... 还有 ${files.length - 10} 个文件`)
}
console.log('')

let uploaded = 0
let failed = 0

// 上传文件
async function uploadFile(file) {
  const localPath = path.join(distDir, file)
  const cosPath = cosPrefix + file.replace(/\\/g, '/')
  
  // 获取文件 MIME 类型
  const contentType = mime.lookup(file) || 'application/octet-stream'
  
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: cosPath,
      Body: fs.createReadStream(localPath),
      ContentType: contentType,
      CacheControl: file.includes('.html') 
        ? 'no-cache' 
        : 'max-age=31536000' // HTML 不缓存，其他资源缓存 1 年
    }, (err, data) => {
      if (err) {
        console.error(`❌ 上传失败: ${file}`)
        console.error(`   ${err.message}`)
        failed++
        reject(err)
      } else {
        uploaded++
        const progress = ((uploaded + failed) / files.length * 100).toFixed(1)
        console.log(`✅ [${progress}%] ${file}`)
        resolve(data)
      }
    })
  })
}

// 批量上传（控制并发数）
async function uploadAll() {
  const concurrency = 5 // 并发上传数
  const chunks = []
  
  for (let i = 0; i < files.length; i += concurrency) {
    chunks.push(files.slice(i, i + concurrency))
  }
  
  for (const chunk of chunks) {
    await Promise.allSettled(chunk.map(uploadFile))
  }
}

// 开始上传
uploadAll()
  .then(() => {
    console.log('')
    console.log('🎉 上传完成！')
    console.log(`✅ 成功: ${uploaded} 个文件`)
    if (failed > 0) {
      console.log(`❌ 失败: ${failed} 个文件`)
    }
    console.log('')
    console.log(`🌐 访问地址: https://${config.Bucket}.cos.${config.Region}.myqcloud.com/${cosPrefix}index.html`)
    console.log('')
  })
  .catch((err) => {
    console.error('❌ 上传过程出错:', err)
    process.exit(1)
  })
