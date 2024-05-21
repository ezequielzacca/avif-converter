const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = './input'; // Directory where your images are stored
const outputPath = './output'; // Directory where AVIF images will be saved

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Read all files in the input directory
fs.readdir(inputPath, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.filter(file).forEach(file => {
        const inputFile = path.join(inputPath, file);
        const outputFile = path.join(outputPath, `${path.parse(file).name}.avif`);

        // Convert image to AVIF format
        sharp(inputFile)
            .toFormat('avif', { quality: 70 }) // Adjust quality as needed
            .toFile(outputFile)
            .then(() => {
                console.log(`Converted ${file} to AVIF format.`);
            })
            .catch(err => {
                console.error('Error processing file:', file, err);
            });
    });
});
