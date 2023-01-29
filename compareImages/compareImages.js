
let Jimp = require('jimp');

const compareImages = async (img1,img2) => {
    const image1Data = await Jimp.read(Buffer.from(img1.replace(/^data:image\/png;base64,/, ""), 'base64'));
    let newImg2= img2.replace('../images/', 'frontend/images/');
    const image2Data = await Jimp.read(newImg2);

    let totalDiff = 0;
    let totalPaintedPixels = 0;
    const threshold = 128; // adjust as needed

    image1Data.scan(0, 0, image1Data.bitmap.width, image1Data.bitmap.height, function(x, y, idx) {
        // check the alpha value of the pixel
        const image1A = this.bitmap.data[idx + 3];
        const image2A = image2Data.bitmap.data[idx + 3];
        if (image1A > threshold && image2A > threshold) {
            totalPaintedPixels++;
            const image1R = this.bitmap.data[idx + 0];
            const image1G = this.bitmap.data[idx + 1];
            const image1B = this.bitmap.data[idx + 2];

            const image2R = image2Data.bitmap.data[idx + 0];
            const image2G = image2Data.bitmap.data[idx + 1];
            const image2B = image2Data.bitmap.data[idx + 2];

            totalDiff += Math.abs(image1R - image2R) + Math.abs(image1G - image2G) + Math.abs(image1B - image2B);
        }
    });

    const totalPixels = totalPaintedPixels * 3;
    const meanAbsoluteError = totalDiff / totalPixels;
    const similarity = 100 - (meanAbsoluteError / 255) * 100;
    const similarityFix= similarity.toFixed(2);
    console.log("Similarity: " + similarityFix+ "%");
    return similarityFix;

}

module.exports.compareImages=compareImages;
