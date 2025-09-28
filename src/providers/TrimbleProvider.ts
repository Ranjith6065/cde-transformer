import type { ICDEProvider, ProviderFile } from './ICDEProvider';
const { mockData } = require('../utils/mockData');
class TrimbleProvider implements ICDEProvider {
  async fetchFiles(projectId: string, auth: { token: string, tokenExpiry: number }): Promise<ProviderFile[]> {
    if (Date.now() >= auth.tokenExpiry) {
        throw new Error('TOKEN_EXPIRED');
    }
    const stubbed = [
      {
        source: 'trimble',
        projectId,
        fileId: 'tr1',
        name: 'Trimble Drawing.pdf',
        version: 'v1',
        size: 444444,
        downloadUrl: 'https://trimble.com/file1',
        updatedAt: '2025-07-09T07:00:00Z',
      },
    ];
    
    const mockresponse = mockData.generatecommonstructMockFiles(499, 'trimble', projectId);
    const combined = [...stubbed, ...mockresponse];
    return combined;
  }
}

module.exports = { TrimbleProvider };
