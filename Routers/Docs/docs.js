import HyperExpress from 'hyper-express';
import LiveDirectory from 'live-directory';

const LiveAssets = new LiveDirectory('static/', {
    keep: {
        extensions: ['.otf', '.ico', '.css', '.js', '.html', '.json', '.png', '.jpg', '.jpeg', '.svg']
    },
    ignore: (path) => {
        return path.startsWith('.');
    }
});

export const DocsRouter = new HyperExpress.Router();

DocsRouter.get('/*', async (req, res) => {
    let path = req.path.substring(1);
    path = decodeURI(path);
    const file = LiveAssets.get(path || 'index.html');
    if (file) {
        res.status(200)
        if (file.cached) {
            return res.send(file.content);
        }
        else {
            return file.stream().pipe(res);
        }
    }
    else {
        return res.status(404).send();
    }
});