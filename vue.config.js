const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    https: true,
    https: true,
    https: {
      key: fs.readFileSync('./certs/dormitory-key.pem'),
      cert: fs.readFileSync('./certs/dormitory.pem'),
    },
    allowedHosts: "all",
    host: 'dormitory'
  }
}
