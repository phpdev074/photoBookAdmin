import { useState } from 'react';
import { Check, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
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

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
}

const initialPackages: Package[] = [
  {
    id: 1,
    name: 'Basic',
    price: 9.99,
    description: 'Perfect for individuals getting started',
    features: ['5 Projects', '10GB Storage', 'Basic Support', 'Mobile App'],
    color: 'border-gray-300',
  },
  {
    id: 2,
    name: 'Pro',
    price: 24.99,
    description: 'Best for professionals and small teams',
    features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Team Collaboration'],
    color: 'border-[#5F63EF]',
  },
  {
    id: 3,
    name: 'Premium',
    price: 49.99,
    description: 'For large teams and enterprises',
    features: ['Unlimited Everything', 'Custom Storage', '24/7 Support', 'Advanced Security', 'API Access', 'Custom Integrations'],
    color: 'border-purple-500',
  },
];

export function Packages() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [editDialog, setEditDialog] = useState<{ open: boolean; package: Package | null }>({
    open: false,
    package: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; packageId: number | null }>({
    open: false,
    packageId: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: '',
  });

  const handleEdit = (pkg: Package) => {
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      description: pkg.description,
      features: pkg.features.join('\n'),
    });
    setEditDialog({ open: true, package: pkg });
  };

  const handleSave = () => {
    if (editDialog.package) {
      setPackages(
        packages.map((pkg) =>
          pkg.id === editDialog.package!.id
            ? {
                ...pkg,
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                features: formData.features.split('\n').filter((f) => f.trim()),
              }
            : pkg
        )
      );
      setEditDialog({ open: false, package: null });
    }
  };

  const handleDelete = (packageId: number) => {
    setDeleteDialog({ open: true, packageId });
  };

  const confirmDelete = () => {
    if (deleteDialog.packageId) {
      setPackages(packages.filter((pkg) => pkg.id !== deleteDialog.packageId));
      setDeleteDialog({ open: false, packageId: null });
    }
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      features: '',
    });
    setEditDialog({ open: true, package: { id: Date.now(), name: '', price: 0, description: '', features: [], color: 'border-gray-300' } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Subscription Packages</h1>
          <p className="text-muted-foreground">Manage your subscription plans</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#5F63EF] hover:bg-[#4b4fd9]">
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`border-2 ${pkg.color} relative`}>
            {pkg.name === 'Pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#5F63EF] text-white px-3 py-1 rounded-full text-xs">
                  Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{pkg.name}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(pkg)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(pkg.id)}
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">${pkg.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#5F63EF] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ open, package: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editDialog.package?.id && packages.find(p => p.id === editDialog.package?.id) ? 'Edit' : 'Add'} Package</DialogTitle>
            <DialogDescription>
              Make changes to the subscription package details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Premium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($/month)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 29.99"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Unlimited Storage&#10;24/7 Support&#10;API Access"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog({ open: false, package: null })}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#5F63EF] hover:bg-[#4b4fd9]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, packageId: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot be undone.
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
