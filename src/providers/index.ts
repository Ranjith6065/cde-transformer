const { Bim360Provider } = require('./Bim360Provider');
const { ProcoreProvider } = require('./ProcoreProvider');
const { ViewpointProvider } = require('./ViewpointProvider');
const { TrimbleProvider } = require('./TrimbleProvider');
const { AccnoexProvider } = require('./AccnoexProvider');

function getProvider(name:any) {
  switch (name) {
    case 'bim360': return new Bim360Provider();
    case 'procore': return new ProcoreProvider();
    case 'viewpoint': return new ViewpointProvider();
    case 'trimble': return new TrimbleProvider();
    case 'accnoex': return new AccnoexProvider();
    default: throw new Error('Unknown provider: ' + name);
  }
}

module.exports = { getProvider };
