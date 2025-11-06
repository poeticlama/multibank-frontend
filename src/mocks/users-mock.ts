import type { User } from '../types/account-types.ts';

const mockUsers: User[] = [
  { id: 1, login: 'user1', password: '1111', name: 'Пенис Денисович', status: "DEFAULT" },
  { id: 2, login: 'user2', password: '2222', name: 'Иван Говнов', status: "DEFAULT" },
  { id: 3, login: 'admin', password: 'admin123', name: 'Админисратор', status: "PREMIUM" },
];

export default mockUsers;