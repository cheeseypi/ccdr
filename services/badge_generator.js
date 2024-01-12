import * as fs from 'node:fs';
import sharp from 'sharp';
import handlebars from 'handlebars';

const standardStyle = fs.readFileSync('svgs/Standard.svg.handlebars');
const standardTemplate = handlebars.compile(standardStyle.toString());
const extendedStyle = fs.readFileSync('svgs/Standard_Extended.svg.handlebars');
const extendedTemplate = handlebars.compile(extendedStyle.toString());

export function GenerateBadgeSVG(tech, precision, chocolate=undefined, unreadability=undefined, isRedVerified=false, isGoldVerified=false){
    let template = extendedTemplate;
    if(!chocolate | !unreadability){
        template = standardTemplate;
    }

    let args = [Math.round(tech * 10)/10 || '', Math.round(precision * 10)/10 || '', Math.round(chocolate*10)/10 || '', Math.round(unreadability*10)/10 || ''];

    let success = true;
    let renderedSVG;
    if (args.some(x => x && (x < 1 || x > 9.9))) {
        renderedSVG = template({ tech: "Error", precision: '', chocolate: '', unreadability: '' });
    }
    else {
        renderedSVG = template({ tech:args[0], precision:args[1], chocolate:args[2], unreadability:args[3], isGold: isGoldVerified, isRed: isRedVerified });
    }

    return [success, renderedSVG]
}

export async function GenerateBadge(tech, precision, chocolate=undefined, unreadability=undefined, isRedVerified=false, isGoldVerified=false, height=30){
    let [success, renderedSVG] = GenerateBadgeSVG(tech, precision, chocolate, unreadability, isRedVerified, isGoldVerified);
    let pic;
    if(success)
        pic = await sharp(Buffer.from(renderedSVG), { background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(undefined, height).png().toBuffer();

    return [success, pic]
}