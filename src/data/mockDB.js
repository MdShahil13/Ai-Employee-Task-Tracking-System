export const mockUsers = [
  { id: 1, name: 'Admin One', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+One&background=4F46E5&color=fff' },
  { id: 2, name: 'Jane Doe', role: 'employee', score: 85, avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0EA5E9&color=fff' },
  { id: 3, name: 'John Smith', role: 'employee', score: 92, avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10B981&color=fff' }
];

export const mockTasks = [
  { 
    id: 101, 
    title: 'Update Landing Page UI', 
    description: 'Implement glassmorphism on the main page.', 
    priority: 'High', 
    status: 'Pending', 
    assignedTo: 2, 
    deadline: '2026-03-25' 
  },
  { 
    id: 102, 
    title: 'Fix Auth Bug', 
    description: 'Resolve token expiration issue.', 
    priority: 'Medium', 
    status: 'In Progress', 
    assignedTo: 3, 
    deadline: '2026-03-22' 
  }
];
