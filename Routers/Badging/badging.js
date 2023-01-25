import * as fs from 'node:fs';
import HyperExpress from 'hyper-express';
import sharp from 'sharp';
import handlebars from 'handlebars';

const standardStyle = fs.readFileSync('svgs/Standard.svg.handlebars');
const standardTemplate = handlebars.compile(standardStyle.toString());
const extendedStyle = fs.readFileSync('svgs/Standard_Extended.svg.handlebars');
const extendedTemplate = handlebars.compile(extendedStyle.toString());

export const BadgeRouter = new HyperExpress.Router();

BadgeRouter.get('/:tech/:precision', async (req, res) => {
    let tech = req.path_parameters.tech;
    let precision = req.path_parameters.precision;

    let status = 200;
    let renderedSVG;
    let args = [tech, precision]
    if (args.some(x => x.length > 1 || x < 1 || x > 5)) {
        status = 400;
        renderedSVG = standardTemplate({ tech: "Error", precision: '' });
    }
    else {
        renderedSVG = standardTemplate({ tech, precision });
    }

    let pic = await sharp(Buffer.from(renderedSVG), { background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(undefined, 30).png().toBuffer();

    res.setHeader('content-type', 'image/png');
    res.status(status).send(pic);
})

BadgeRouter.get('/:tech/:precision/:chocolate/:execution', async (req, res) => {
    let tech = req.path_parameters.tech;
    let precision = req.path_parameters.precision;
    let chocolate = req.path_parameters.chocolate;
    let execution = req.path_parameters.execution;

    let status = 200;
    let renderedSVG;
    let args = [tech, precision, chocolate, execution]
    if (args.some(x => x.length > 1 || x < 1 || x > 5)) {
        status = 400;
        renderedSVG = extendedTemplate({ tech: "Error", precision: '', chocolate: '', execution: '' });
    }
    else {
        renderedSVG = extendedTemplate({ tech, precision, chocolate, execution });
    }

    let pic = await sharp(Buffer.from(renderedSVG), { background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(undefined, 30).png().toBuffer();

    res.setHeader('content-type', 'image/png');
    res.status(status).send(pic);
})