import { useState, useEffect } from 'react';
import { Crown, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Subscription {
  _id: string;
  planName: string;
  price: number;
  billingCycle: string;
  isActive: boolean;
  features: string[];
}

const API_BASE_URL = 'http://72.62.92.138:5419';

export default function SubscriptionManager() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Subscription>>({});
  const [language, setLanguage] = useState<'en' | 'sp'>('en');

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/subscription`, {
        headers: {
          'Accept-Language': language,
        },
      });
      const result = await response.json();
      setSubscriptions(result.data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [language]);

  // Filter subscriptions by billing cycle
  const filteredSubscriptions = subscriptions.filter(
    (sub) => sub.billingCycle === activeTab
  );

  // Start editing
  const handleEdit = (subscription: Subscription) => {
    setEditingId(subscription._id);
    setEditForm({
      planName: subscription.planName,
      price: subscription.price,
      billingCycle: subscription.billingCycle,
      features: [...subscription.features],
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Update subscription
  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/subscription/update-subscription?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        await fetchSubscriptions();
        setEditingId(null);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  // Update feature in edit form
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(editForm.features || [])];
    newFeatures[index] = value;
    setEditForm({ ...editForm, features: newFeatures });
  };

  // Add new feature
  const addFeature = () => {
    setEditForm({
      ...editForm,
      features: [...(editForm.features || []), ''],
    });
  };

  // Remove feature
  const removeFeature = (index: number) => {
    const newFeatures = [...(editForm.features || [])];
    newFeatures.splice(index, 1);
    setEditForm({ ...editForm, features: newFeatures });
  };

  const planColors: Record<string, string> = {
    Básico: 'bg-gray-100 text-gray-800',
    Basic: 'bg-gray-100 text-gray-800',
    Pro: 'bg-blue-100 text-blue-800',
    Premium: 'bg-purple-100 text-purple-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage your subscription plans</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
            size="sm"
          >
            English
          </Button>
          <Button
            variant={language === 'sp' ? 'default' : 'outline'}
            onClick={() => setLanguage('sp')}
            size="sm"
          >
            Español
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('monthly')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'monthly'
              ? 'border-b-2 border-[#5F63EF] text-[#5F63EF]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly Plans ({subscriptions.filter((s) => s.billingCycle === 'monthly').length})
        </button>
        <button
          onClick={() => setActiveTab('yearly')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'yearly'
              ? 'border-b-2 border-[#5F63EF] text-[#5F63EF]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Yearly Plans ({subscriptions.filter((s) => s.billingCycle === 'yearly').length})
        </button>
      </div>

      {/* Subscription Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubscriptions.map((subscription) => (
          <Card key={subscription._id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      planColors[subscription.planName] || 'bg-gray-100'
                    }`}
                  >
                    <Crown className="h-6 w-6" />
                  </div>
                  <div>
                    {editingId === subscription._id ? (
                      <Input
                        value={editForm.planName}
                        onChange={(e) =>
                          setEditForm({ ...editForm, planName: e.target.value })
                        }
                        className="h-8 font-bold text-lg"
                      />
                    ) : (
                      <CardTitle className="text-2xl">{subscription.planName}</CardTitle>
                    )}
                    <Badge
                      variant={subscription.isActive ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {subscription.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {editingId === subscription._id ? (
                      <Input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: parseFloat(e.target.value) })
                        }
                        className="h-12 text-3xl font-bold w-32"
                      />
                    ) : (
                      `$${subscription.price}`
                    )}
                  </span>
                  <span className="text-muted-foreground">
                    /{activeTab === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm text-muted-foreground">Features:</p>
                <ul className="space-y-2">
                  {editingId === subscription._id ? (
                    <>
                      {editForm.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="h-8 text-sm flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        className="w-full"
                      >
                        + Add Feature
                      </Button>
                    </>
                  ) : (
                    subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="pt-4">
                {editingId === subscription._id ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdate(subscription._id)}
                      className="flex-1 bg-[#5F63EF] hover:bg-[#4F53DF]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleEdit(subscription)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No {activeTab} subscription plans found.
          </p>
        </div>
      )}
    </div>
  );
}