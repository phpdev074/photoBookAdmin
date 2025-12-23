import { useState } from 'react';
import { Search, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Subscriber {
  id: number;
  name: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Premium';
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring';
}

const initialSubscribers: Subscriber[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    plan: 'Pro',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'expiring',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    plan: 'Basic',
    startDate: '2024-02-10',
    endDate: '2025-02-10',
    status: 'active',
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@example.com',
    plan: 'Premium',
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    status: 'active',
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    plan: 'Pro',
    startDate: '2024-04-05',
    endDate: '2025-04-05',
    status: 'active',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    plan: 'Basic',
    startDate: '2024-03-15',
    endDate: '2024-12-28',
    status: 'expiring',
  },
];

const planColors = {
  Basic: 'bg-gray-100 text-gray-800',
  Pro: 'bg-blue-100 text-blue-800',
  Premium: 'bg-purple-100 text-purple-800',
};

export function SubscriptionManager() {
  const [subscribers] = useState<Subscriber[]>(initialSubscribers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Subscribed Users</h1>
          <p className="text-muted-foreground">View all active subscribers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Basic Plan</p>
                <p className="text-2xl font-bold">
                  {subscribers.filter((s) => s.plan === 'Basic').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pro Plan</p>
                <p className="text-2xl font-bold">
                  {subscribers.filter((s) => s.plan === 'Pro').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Premium Plan</p>
                <p className="text-2xl font-bold">
                  {subscribers.filter((s) => s.plan === 'Premium').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CardTitle>Subscribers List ({filteredSubscribers.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
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
                  <th className="text-left py-3 px-4">Subscriber</th>
                  <th className="text-left py-3 px-4">Plan</th>
                  <th className="text-left py-3 px-4">Start Date</th>
                  <th className="text-left py-3 px-4">End Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#5F63EF] flex items-center justify-center text-white">
                          {subscriber.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{subscriber.name}</p>
                          <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={planColors[subscriber.plan]}>{subscriber.plan}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{subscriber.startDate}</td>
                    <td className="py-3 px-4 text-muted-foreground">{subscriber.endDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={subscriber.status === 'active' ? 'default' : 'secondary'}
                        className={
                          subscriber.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                        }
                      >
                        {subscriber.status === 'active' ? 'Active' : 'Expiring Soon'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
