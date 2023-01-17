let Jimp = require('jimp');

const compareImages = async () =>
{
    const jimage1 = await Jimp.read('frontend/images/paint1.png');
    const jimage2 = await Jimp.read('frontend/images/paint1.png');
    const width = jimage1.bitmap.width;
    let diff = Jimp.diff(jimage1, jimage2, .1);
    console.log("Percent Difference - ", diff.percent);
}
compareImages();
