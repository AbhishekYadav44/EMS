export interface OrganizationNode {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  children: OrganizationNode[];
}