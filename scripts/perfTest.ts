const { performance } = require('perf_hooks');
const { mockData } = require('../src/utils/mockData');
const { resolveDuplicates } = require('../src/utils/duplicateResolver');

// Generate 500 mock BIM360 records (unstructured, as from API)
const mockFiles = mockData.generateUnstructMockFiles(500, 'bim360', 'proj1');

const t0 = performance.now();
const deduped = resolveDuplicates(mockFiles);
const t1 = performance.now();

console.log(`Aggregated 500 files in ${(t1 - t0).toFixed(2)} ms`);