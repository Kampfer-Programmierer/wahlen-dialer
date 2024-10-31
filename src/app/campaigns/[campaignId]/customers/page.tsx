import React from 'react';
import { useRouter } from 'next/router';

const CustomerListPage = () => {
  const router = useRouter();
  const { campaignId } = router.query;

  // Fetch customers for the specific campaign here
  // Use the campaignId to get the relevant customers

  return (
    <div>
      <h2>Customers for Campaign {campaignId}</h2>
      {/* Render the list of customers here */}
    </div>
  );
};

export default CustomerListPage;
