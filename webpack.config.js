var config = {
    entry: './main.js',
    output: {
       path:'/',
       filename: 'index.js',
    },
    devServer: {
       inline: true,
       port: 8000,
       historyApiFallback: true
    },
    resolve:{
        extensions: ['*', '.js', '.jsx', '.json'],        
    },
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015', 'react']
             }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|gif|eot|svg|woff|woff2|ttf)$/,
            use: [
              {
                loader: 'file-loader',
              }
            ]
          }
       ]
    }
 }
 module.exports = config;