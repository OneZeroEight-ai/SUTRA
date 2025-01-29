import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const TokenInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const tokenData = {
    totalSupply: {
      label: 'Total Supply',
      value: '108,000,000 SUTRA',
      description: 'Maximum token supply'
    },
    initialDistribution: {
      label: 'Initial Distribution',
      value: '21,000,000 SUTRA',
      description: 'Currently circulating supply'
    },
    emissionSchedule: {
      label: 'Emission Schedule',
      value: '108 Years',
      description: 'Linear release period'
    },
    halvingPeriod: {
      label: 'Halving Period',
      value: '4 Years',
      description: 'Block rewards halving interval'
    }
  };

  const tokenMetrics = {
    preservationRights: {
      label: 'Preservation Rights',
      value: '108 SUTRA',
      description: 'Minimum holding for basic access'
    },
    stakingAmount: {
      label: 'Verification Staking',
      value: '1,080 SUTRA',
      description: 'Required for alignment verification'
    },
    guardianStatus: {
      label: 'Guardian Status',
      value: '10,800 SUTRA',
      description: 'Advanced governance rights'
    }
  };

  const handleConnect = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Mock wallet connection for UI demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Wallet connected successfully');
    } catch (err) {
      setError('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Token Information</h1>
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
          <CardTitle>Token Supply & Emissions</CardTitle>
          <CardDescription>Key metrics about SUTRA token supply and distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(tokenData).map((metric) => (
              <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-xl font-bold text-indigo-600">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membership Tiers</CardTitle>
          <CardDescription>Token holding requirements for different access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(tokenMetrics).map((metric) => (
              <div key={metric.label} className="p-6 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      Required
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{metric.value}</p>
                  <p className="text-sm text-gray-500">{metric.description}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <Button 
                      className="w-full bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600"
                      disabled
                    >
                      Wallet Required
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Utility</CardTitle>
          <CardDescription>Core functionalities enabled by SUTRA tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Preservation Rights</h3>
              <p className="mt-2 text-sm text-gray-500">
                Secure long-term preservation rights through token holdings
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Alignment Verification</h3>
              <p className="mt-2 text-sm text-gray-500">
                Participate in the verification of alignment proofs
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Governance</h3>
              <p className="mt-2 text-sm text-gray-500">
                Vote on protocol updates and resource allocation
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Community Access</h3>
              <p className="mt-2 text-sm text-gray-500">
                Access community resources and services
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Service Payments</h3>
              <p className="mt-2 text-sm text-gray-500">
                Pay for alignment verification and preservation services
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Integration Systems</h3>
              <p className="mt-2 text-sm text-gray-500">
                Build and integrate preservation systems
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenInfo;