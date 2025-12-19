import { Users, UserCheck, UserPlus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Active Users',
    value: '1,842',
    change: '+8.2%',
    icon: UserCheck,
    color: 'bg-green-500',
  },
  {
    title: 'Subscribed Users',
    value: '892',
    change: '+23.1%',
    icon: UserPlus,
    color: 'bg-[#5F63EF]',
  },
  {
    title: 'Growth Rate',
    value: '18.4%',
    change: '+4.3%',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

const recentActivities = [
  { user: 'John Doe', action: 'Subscribed to Premium', time: '2 minutes ago' },
  { user: 'Sarah Smith', action: 'Created new account', time: '15 minutes ago' },
  { user: 'Mike Johnson', action: 'Upgraded to Pro', time: '1 hour ago' },
  { user: 'Emily Brown', action: 'Renewed subscription', time: '2 hours ago' },
  { user: 'David Wilson', action: 'Created new account', time: '3 hours ago' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5F63EF]/10 flex items-center justify-center">
                    <span className="text-[#5F63EF] font-semibold">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">User Engagement</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#5F63EF] h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Subscription Rate</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Retention Rate</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
