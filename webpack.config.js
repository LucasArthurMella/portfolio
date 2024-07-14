const path = require('path');
const fs = require('fs');

// Recursive function to get all TypeScript files in a directory and its subdirectories
function getEntries(dir) {
    const entries = {};

    // Synchronously read all files in the directory
    const files = fs.readdirSync(dir);

    // Process each file or directory
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && file.endsWith('.ts')) {
            // If it's a TypeScript file, add it as an entry point
            const entryName = path.parse(file).name; // Use file name as entry name
            entries[entryName] = fullPath;
        } else if (stat.isDirectory()) {
            // If it's a directory, recursively call getEntries
            const nestedEntries = getEntries(fullPath);
            Object.assign(entries, nestedEntries);
        }
    });

    return entries;
}

module.exports = {
    mode: 'development', // or 'production'
    entry: getEntries(path.resolve(__dirname, 'src/public/javascripts')), // Specify source directory
    output: {
        filename: 'public/javascripts/[name]/bundle.js', // Output filename with [name] placeholder
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    }
};
