import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export function UserBilling() {
  const invoices = [
    { id: 1, date: '2024-03-01', amount: 49.99, status: 'paid' },
    { id: 2, date: '2024-02-01', amount: 49.99, status: 'paid' },
    { id: 3, date: '2024-01-01', amount: 49.99, status: 'paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Payment Method
        </h3>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-4">
            <CreditCard className="text-gray-400" size={24} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                •••• •••• •••• 4242
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires 12/24
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </div>

        <Button className="mt-4" variant="ghost">
          <Plus size={18} className="mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Billing History
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    ${invoice.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}