import { Heading } from '@/components/inputs/TextInputs';
import Layout from '@/containers/navigation/Layout';
import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <Layout>
      <main className="w-full flex flex-col items-center justify-center min-h-[80vh]">
        <Heading>Dashboard</Heading>
      </main>
    </Layout>
  );
};

export default Dashboard;
