const express = require('express');
const { getProvider } = require('../providers');
const { resolveDuplicates } = require('../utils/duplicateResolver');

const router = express.Router();

// GET /v1/files?providers=bim360,procore&project=<id>
router.get('/v1/files', async (req:any, res:any) => {
  try {
    const providersParam = req.query.providers;
    const projectId = req.query.project;
    if (!providersParam || !projectId) {
      return res.status(400).json({ error: 'Missing providers or project parameter' });
    }
    const providerNames = providersParam.split(',');
    const auth = {
    token: 'initial-token',
    tokenExpiry: Date.now() + 3600000,
    async refreshToken() {
      this.token = 'new-token';
      this.tokenExpiry = Date.now() + 3600000
      return this.token;
    }
    };
    const results = await Promise.all(
      providerNames.map((name:any) => getProvider(name).fetchFiles(projectId, auth))
    );
    let files = results.flat();
    files = resolveDuplicates(files);
    files.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    res.json(files);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    if (errorMessage === 'TOKEN_EXPIRED') {
        return res.status(401).json({ error: 'Auth token expired' });
    }
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;