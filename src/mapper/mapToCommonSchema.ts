import type { ProviderFile } from '../providers/ICDEProvider';

// Example mappers for two providers
function mapBim360ToCommon(bimFile: any): ProviderFile {
  return {
    source: 'bim360',
    projectId: bimFile.project_id,
    fileId: bimFile.id,
    name: bimFile.name,
    version: bimFile.version,
    size: bimFile.size,
    downloadUrl: bimFile.download_url,
    updatedAt: bimFile.updated_at,
  };
}

function mapProcoreToCommon(procoreFile: any): ProviderFile {
  return {
    source: 'procore',
    projectId: procoreFile.project_id,
    fileId: procoreFile.id,
    name: procoreFile.file_name,
    version: procoreFile.revision,
    size: procoreFile.file_size,
    downloadUrl: procoreFile.url,
    updatedAt: procoreFile.last_modified,
  };
}

module.exports = { mapBim360ToCommon, mapProcoreToCommon };
