import type { ICDEProvider, ProviderFile } from './ICDEProvider';
const { mapBim360ToCommon } = require('../mapper/mapToCommonSchema');
const { exponentialBackoff } = require('../utils/rateLimiter');
const { mockData } = require('../utils/mockData');

class Bim360Provider implements ICDEProvider {
  async fetchFiles(projectId: string, auth: { token: string, tokenExpiry: number }): Promise<ProviderFile[]> {
    if (Date.now() >= auth.tokenExpiry) {
        throw new Error('TOKEN_EXPIRED');
    }

    const stubbed = [
      {
        project_id: projectId,
        id: 'bim1',
        name: 'Drawing1.pdf',
        version: 'v1',
        size: 123456,
        download_url: 'https://bim360.com/file1',
        updated_at: '2025-07-04T16:21:00Z',
      },
      {
        project_id: projectId,
        id: 'bim2',
        name: 'Drawing2.pdf',
        version: 'v2',
        size: 654321,
        download_url: 'https://bim360.com/file2',
        updated_at: '2025-07-05T10:00:00Z',
      },
      {
        project_id: projectId,
        id: 'bim2',
        name: 'Drawing3.pdf',
        version: 'v2',
        size: 654322,
        download_url: 'https://bim360.com/file2',
        updated_at: '2025-07-05T11:00:00Z',
      },
    ];
    const mockresponse = mockData.generateUnstructBimMockFiles(497, 'bim360', projectId);
    const combined = [...stubbed, ...mockresponse];
    return exponentialBackoff(() => Promise.resolve(combined.map(mapBim360ToCommon)));
  }
}

module.exports = { Bim360Provider };
