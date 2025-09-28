import type { ICDEProvider, ProviderFile } from './ICDEProvider';
const { mapProcoreToCommon } = require('../mapper/mapToCommonSchema');
const { exponentialBackoff } = require('../utils/rateLimiter');
const { mockData } = require('../utils/mockData');

class ProcoreProvider implements ICDEProvider {
  async fetchFiles(projectId: string, auth: { token: string, tokenExpiry: number }): Promise<ProviderFile[]> {
    if (Date.now() >= auth.tokenExpiry) {
        throw new Error('TOKEN_EXPIRED');
    }
    const stubbed = [
      {
        project_id: projectId,
        id: 'pro1',
        file_name: 'Drawing1.pdf',
        revision: 'r1',
        file_size: 222222,
        url: 'https://procore.com/file1',
        last_modified: '2025-07-06T12:00:00Z',
      },
      {
        project_id: projectId,
        id: 'pro2',
        file_name: 'Drawing2.pdf',
        revision: 'r2',
        file_size: 333333,
        url: 'https://procore.com/file2',
        last_modified: '2025-07-07T09:00:00Z',
      },
    ];
    const mockresponse = mockData.generateUnstructProcoreMockFiles(498, 'procore', projectId);
    const combined = [...stubbed, ...mockresponse];
    return exponentialBackoff(() => Promise.resolve(combined.map(mapProcoreToCommon)));
  }
}

module.exports = { ProcoreProvider };
