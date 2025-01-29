import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');

 // Mock user data - will be replaced with actual blockchain data
 const userData = {
   sutraBalance: '1,580.00',
   preservationStatus: 'Active', 
   preservationRights: 'Basic Access',
   alignmentScore: '95',
   lastVerification: '2025-01-15'
 };

 const systemMetrics = {
   totalPreserved: '152,847',
   activeVerifiers: '1,245',
   avgAlignmentScore: '92.5',
   governanceProposals: '8'
 };

 const userActions = [
   {
     title: 'Preservation Rights',
     description: 'Manage your preservation settings and status',
     action: 'Manage',
     link: '/preservation'
   },
   {
     title: 'Alignment Verification', 
     description: 'Participate in verification or submit proofs',
     action: 'Verify',
     link: '/verification'
   },
   {
     title: 'Token Pools',
     description: 'View and interact with SUTRA token pools',
     action: 'View',
     link: '/pools'
   },
   {
     title: 'Governance',
     description: 'Vote on proposals and participate in decision making',
     action: 'Participate',
     link: '/governance'
   }
 ];

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
       <h1 className="text-3xl font-bold">SUTRA Dashboard</h1>
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
         <CardTitle>Your SUTRA Status</CardTitle>
         <CardDescription>Overview of your account and preservation status</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">SUTRA Balance</p>
             <p className="text-2xl font-bold text-indigo-600">{userData.sutraBalance}</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Preservation Status</p>
             <p className="text-2xl font-bold text-green-600">{userData.preservationStatus}</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Rights Level</p>
             <p className="text-2xl font-bold text-indigo-600">{userData.preservationRights}</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Alignment Score</p>
             <p className="text-2xl font-bold text-indigo-600">{userData.alignmentScore}%</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Last Verification</p>
             <p className="text-lg font-bold text-indigo-600">{userData.lastVerification}</p>
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>System Metrics</CardTitle>
         <CardDescription>Current state of the SUTRA ecosystem</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Total Preserved</p>
             <p className="text-2xl font-bold text-indigo-600">{systemMetrics.totalPreserved}</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Active Verifiers</p>
             <p className="text-2xl font-bold text-indigo-600">{systemMetrics.activeVerifiers}</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Avg Alignment Score</p>
             <p className="text-2xl font-bold text-indigo-600">{systemMetrics.avgAlignmentScore}%</p>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg">
             <p className="text-sm text-gray-500">Active Proposals</p>
             <p className="text-2xl font-bold text-indigo-600">{systemMetrics.governanceProposals}</p>
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Quick Actions</CardTitle>
         <CardDescription>Manage your SUTRA participation</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {userActions.map((action) => (
             <div key={action.title} className="p-6 bg-gray-50 rounded-lg">
               <div className="space-y-3">
                 <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                 <p className="text-sm text-gray-500">{action.description}</p>
                 <div className="pt-3">
                   <Button 
                     className="w-full bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600"
                     disabled={!success}
                   >
                     {action.action}
                   </Button>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>
   </div>
 );
};

export default Dashboard;