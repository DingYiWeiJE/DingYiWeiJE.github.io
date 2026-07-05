export interface Label {
  name: string;
  count: number;
  color: string;
}

export interface Dataset {
  id: string;
  name: string;
  version: string;
  imageCount: number;
  labeledCount: number;
  labels: Label[];
  createdAt: string;
  updatedAt: string;
  size: string;
  format: string;
  description: string;
  tags: string[];
}

export interface DatasetFilters {
  search: string;
  tags: string[];
  sortBy: 'latest' | 'name' | 'size';
}
