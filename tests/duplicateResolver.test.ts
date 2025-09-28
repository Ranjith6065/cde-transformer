const { resolveDuplicates } = require('../src/utils/duplicateResolver');

describe('Duplicate resolver', () => {
  it('keeps only newest file for same projectId+name', () => {
    const files = [
      { projectId: 'p1', name: 'A', updatedAt: '2025-07-01T00:00:00Z' },
      { projectId: 'p1', name: 'A', updatedAt: '2025-07-02T00:00:00Z' },
      { projectId: 'p1', name: 'B', updatedAt: '2025-07-01T00:00:00Z' },
    ];
    const deduped = resolveDuplicates(files);
    expect(deduped.length).toBe(2);
    expect(deduped.find((f:any) => f.name === 'A').updatedAt).toBe('2025-07-02T00:00:00Z');
  });
});
