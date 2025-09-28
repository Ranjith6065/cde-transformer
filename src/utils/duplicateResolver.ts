import type { ProviderFile } from '../providers/ICDEProvider';

function resolveDuplicates(files: ProviderFile[]): ProviderFile[] {
  const map = new Map<string, ProviderFile>();
  for (const file of files) {
    const key = `${file.projectId}:${file.name}`;
    if (!map.has(key) || new Date(file.updatedAt) > new Date(map.get(key)!.updatedAt)) {
      map.set(key, file);
    }
  }
  return Array.from(map.values());
}

module.exports = { resolveDuplicates };
