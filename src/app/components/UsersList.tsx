import { useEffect, useState } from "react";
import { MoreVertical, Trash2, Ban, Search } from "lucide-react";
import api from "../../api/axios"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

/* ================= TYPES ================= */

interface User {
  _id: string;
  name: string;
  email: string;
  status: "active" | "blocked";
  createdAt: string;
}

/* ================= COMPONENT ================= */

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    userId: string | null;
  }>({ open: false, userId: null });

  const limit = 1;

  /* ================= API ================= */

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const res = await api.get("/users/get-all-users", {
        params: { page, limit },
      });

      const { users, pagination } = res.data.data;

      setUsers(
        users.map((u: any) => ({
          _id: u._id,
          name: u.name,
          email: u.email,
          status: u.isDeleted ? "blocked" : "active",
          createdAt: u.createdAt,
        }))
      );

      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  /* ================= HANDLERS ================= */

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (_id: string) => {
    setDeleteDialog({ open: true, userId: _id });
  };

  const confirmDelete = () => {
    if (deleteDialog.userId) {
      setUsers(users.filter((u) => u._id !== deleteDialog.userId));
      setDeleteDialog({ open: false, userId: null });
    }
  };

  const handleBlock = (_id: string) => {
    setUsers(
      users.map((u) =>
        u._id === _id
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CardTitle>All Users</CardTitle>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading users...
            </div>
          ) : (
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
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-10 text-muted-foreground"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#5F63EF] text-white flex items-center justify-center">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-muted-foreground">
                          {user.email}
                        </td>

                        <td className="py-3 px-4">
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                            variant={
                              user.status === "active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>

                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleBlock(user._id)}
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                {user.status === "active"
                                  ? "Block User"
                                  : "Unblock User"}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleDelete(user._id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DELETE CONFIRMATION */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, userId: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
