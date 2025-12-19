import { useState } from 'react';
import { User, Mail, Lock, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';

export function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@Photo Book.com',
    role: 'Administrator',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match!');
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your avatar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="bg-[#5F63EF] text-white text-4xl">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{profileData.name}</p>
              <p className="text-sm text-muted-foreground">{profileData.role}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                <User className="inline h-4 w-4 mr-2" />
                Full Name
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={profileData.role} disabled />
            </div>
            <Button onClick={handleProfileSave} className="bg-[#5F63EF] hover:bg-[#4b4fd9]">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Lock className="inline h-5 w-5 mr-2" />
            Change Password
          </CardTitle>
          <CardDescription>Ensure your account is using a strong password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <Button onClick={handlePasswordChange} className="bg-[#5F63EF] hover:bg-[#4b4fd9]">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
          <CardDescription>Your activity overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#5F63EF]">2,543</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">892</p>
              <p className="text-sm text-muted-foreground">Subscribers</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-muted-foreground">Active Plans</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">156</p>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
