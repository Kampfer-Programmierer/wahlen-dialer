import { useState } from 'react';
import { useRouter } from 'next/router';

const ImportCustomersPage = () => {
  const router = useRouter();
  const { campaignId } = router.query;
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('campaignId', campaignId as string); // Add campaignId to the form data

    const response = await fetch('/api/customers/import', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Customers imported successfully!');
    } else {
      alert('Failed to import customers.');
    }
  };

  return (
    <div>
      <h2>Import Customers for Campaign {campaignId}</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImportCustomersPage;
