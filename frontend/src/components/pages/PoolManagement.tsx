import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const PoolManagement = () => {
  const [poolData] = useState({
    preservationPool: {
      name: "Preservation Pool",
      allocation: "40%",
      amount: "43,200,000",
      allocated: "2,160,000"
    },
    communityPool: {
      name: "Community Development",
      allocation: "20%",
      amount: "21,600,000",
      allocated: "1,080,000"
    },
    foundersPool: {
      name: "Founding Contributors",
      allocation: "15%",
      amount: "16,200,000",
      allocated: "810,000"
    },
    operationsPool: {
      name: "Operations",
      allocation: "15%",
      amount: "16,200,000",
      allocated: "810,000"
    },
    emergencyPool: {
      name: "Emergency Reserve",
      allocation: "10%",
      amount: "10,800,000",
      allocated: "540,000"
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConnect = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      // Mock wallet connection for UI demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Wallet connected successfully");
    } catch (err) {
      setError("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pool Management</h1>
        <Button 
          onClick={handleConnect}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Connect Wallet
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Token Pool Allocations</CardTitle>
          <CardDescription>Overview of SUTRA token pool distributions and allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(poolData).map((pool) => (
              <div key={pool.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">{pool.name}</p>
                    <p className="text-xl font-bold text-indigo-600">{pool.allocation}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{pool.amount} SUTRA</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Allocated</p>
                    <p className="text-lg font-semibold text-gray-900">{pool.allocated} SUTRA</p>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div 
                        className="bg-indigo-600 rounded"
                        style={{ 
                          width: `${(parseInt(pool.allocated.replace(/,/g, "")) / 
                            parseInt(pool.amount.replace(/,/g, ""))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pool Actions</CardTitle>
          <CardDescription>
            Connect your wallet to manage pool allocations and participate in governance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-yellow-800">
                Please connect your wallet to access pool management features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoolManagement;