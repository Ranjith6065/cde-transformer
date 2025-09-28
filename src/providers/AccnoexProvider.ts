import type { ICDEProvider, ProviderFile } from './ICDEProvider';
const { mockData } = require('../utils/mockData');

class AccnoexProvider implements ICDEProvider {
  async fetchFiles(projectId:string, auth: { token: string, tokenExpiry: number }): Promise<ProviderFile[]> {
    if (Date.now() >= auth.tokenExpiry) {
        throw new Error('TOKEN_EXPIRED');
    }
    const stubbed = [
      {
        source: 'accnoex',
        projectId,
        fileId: 'acc1',
        name: 'Accnoex Drawing.pdf',
        version: 'v1',
        size: 555555,
        downloadUrl: 'https://accnoex.com/file1',
        updatedAt: '2025-07-10T06:00:00Z',
      },
    ];
    const mockresponse = mockData.generatecommonstructMockFiles(499, 'accnoex', projectId);
    const combined = [...stubbed, ...mockresponse];
    return combined;
  }
}

module.exports = { AccnoexProvider };
