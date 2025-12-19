import { useState } from 'react';
import { MoreVertical, Trash2, Ban, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  joined: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', status: 'active', joined: '2024-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'active', joined: '2024-03-10' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', status: 'blocked', joined: '2024-01-25' },
  { id: 5, name: 'David Wilson', email: 'david@example.com', status: 'active', joined: '2024-04-05' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'active', joined: '2024-03-18' },
  { id: 7, name: 'Tom Martinez', email: 'tom@example.com', status: 'active', joined: '2024-02-14' },
  { id: 8, name: 'Anna Taylor', email: 'anna@example.com', status: 'active', joined: '2024-04-12' },
];

export function UsersList() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId: number | null }>({
    open: false,
    userId: null,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (userId: number) => {
    setDeleteDialog({ open: true, userId });
  };

  const confirmDelete = () => {
    if (deleteDialog.userId) {
      setUsers(users.filter((user) => user.id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null });
    }
  };

  const handleBlock = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Users Management</h1>
          <p className="text-muted-foreground">Manage all registered users</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#5F63EF] flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'destructive'}
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : ''
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleBlock(user.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            {user.status === 'active' ? 'Block User' : 'Unblock User'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, userId: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
