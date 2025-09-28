
function generateUnstructBimMockFiles(count: number, source:string, projectId:string) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      project_id: projectId,
      id: `${source}_mock_${i}`,
      name: `MockFile${i + 1}.pdf`,
      version: `v${i + 1}`,
      size: 100000 + i,
      download_url: `https://${source}.com/mockfile${i + 1}`,
      updated_at: new Date(Date.now() - i * 1000 * 60).toISOString(),
    });
  }
  return arr;
}

function generateUnstructProcoreMockFiles(count: number, source:string, projectId:string) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      project_id: projectId,
      id: `${source}_mock_${i}`,
      name: `MockFile${i + 1}.pdf`,
      version: `v${i + 1}`,
      size: 100000 + i,
      download_url: `https://${source}.com/mockfile${i + 1}`,
      updated_at: new Date(Date.now() - i * 1000 * 60).toISOString(),
    });
  }
  return arr;
}

function generatecommonstructMockFiles(count: number, source:string, projectId:string) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      source,
      projectId,
      fileId: `${source}_mock_${i}`,
      name: `MockFile${i + 1}.pdf`,
      version: `v${i + 1}`,
      size: 100000 + i,
      download_url: `https://${source}.com/mockfile${i + 1}`,
      updated_at: new Date(Date.now() - i * 1000 * 60).toISOString(),
    });
  }
  return arr;
}

module.exports = { mockData: { generateUnstructBimMockFiles,generateUnstructProcoreMockFiles,generatecommonstructMockFiles } };