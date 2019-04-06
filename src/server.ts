process.env.NODE_CONFIG_DIR = __dirname + '/config';

import app from './App';
import config from 'mikro-config';

app.listen(config.server.port, () => {
  console.log('Server listening on port ' + config.server.port);
});
