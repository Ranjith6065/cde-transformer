export interface ProviderFile {
  source: 'bim360' | 'procore' | 'viewpoint' | 'trimble' | 'accnoex';
  projectId: string;
  fileId: string;
  name: string;
  version: string;
  size: number;
  downloadUrl: string;
  updatedAt: string;
}

export interface ICDEProvider {
  fetchFiles(projectId: string, auth: any): Promise<ProviderFile[]>;
}