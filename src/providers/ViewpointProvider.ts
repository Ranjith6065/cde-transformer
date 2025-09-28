import type { ICDEProvider, ProviderFile } from './ICDEProvider';
const { mockData } = require('../utils/mockData');

class ViewpointProvider implements ICDEProvider {
  async fetchFiles(projectId: string, auth: { token: string, tokenExpiry: number }): Promise<ProviderFile[]> {
    if (Date.now() >= auth.tokenExpiry) {
        throw new Error('TOKEN_EXPIRED');
    }
    const stubbed = [
      {
        source: 'viewpoint',
        projectId,
        fileId: 'vp1',
        name: 'VP Drawing.pdf',
        version: 'v1',
        size: 111111,
        downloadUrl: 'https://viewpoint.com/file1',
        updatedAt: '2025-07-08T08:00:00Z',
      },
    ];
    const mockresponse = mockData.generatecommonstructMockFiles(499, 'viewpoint', projectId);
    const combined = [...stubbed, ...mockresponse];
    return combined;
  }
}

module.exports = { ViewpointProvider };
