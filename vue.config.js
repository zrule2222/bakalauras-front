const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    https: true,
    https: true,
    //set the page to use https and provide a key and certificate to enable https
    https: {
      key: fs.readFileSync('./certs/dormitory-key.pem'),
      cert: fs.readFileSync('./certs/dormitory.pem'),
    },
    allowedHosts: "all",
    //the host of the website
    host: 'dormitory'
  }
}
