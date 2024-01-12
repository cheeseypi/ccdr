import HyperExpress from 'hyper-express';
import { GenerateBadge } from '../../services/badge_generator.js';

export const BadgeRouter = new HyperExpress.Router();

BadgeRouter.get('/:tech/:precision', async (req, res) => {
    let tech = req.path_parameters.tech;
    let precision = req.path_parameters.precision;

    let status = 200;
    let [success, pic] = await GenerateBadge(tech, precision)
    if(!success)
        status = 400

    res.setHeader('content-type', 'image/png');
    res.status(status).send(pic);
})

BadgeRouter.get('/:tech/:precision/:chocolate/:execution', async (req, res) => {
    let tech = req.path_parameters.tech;
    let precision = req.path_parameters.precision;
    let chocolate = req.path_parameters.chocolate;
    let execution = req.path_parameters.execution;

    let status = 200;
    let [success, pic] = await GenerateBadge(tech, precision, chocolate, execution)
    if(!success)
        status = 400

    res.setHeader('content-type', 'image/png');
    res.status(status).send(pic);
})