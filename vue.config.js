const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    https: true,
   // key: fs.readFileSync('./certs/example.com+6.pem'),
    //cert: fs.readFileSync('./certs/example.com+6-key.pem'),
    https: true,
    https: {
      key: fs.readFileSync('./certs/dormitory-key.pem'),
      cert: fs.readFileSync('./certs/dormitory.pem'),
    },
    allowedHosts: "all",
    //disableHostCheck: true,
    //public: 'https://dormitory:8080/',
    host: 'dormitory'
  }
}
