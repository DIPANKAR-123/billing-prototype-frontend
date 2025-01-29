import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { Link2, CreditCard, Wallet, Building } from 'lucide-react'
import getBaseUrl from '../../../utils/getBaseUrl';

const LinkAccount = () => {
    const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null)
   const [transactionsres, setTransactionsRes] = useState([]);
   const [isQuickBooksConnected, setIsQuickBooksConnected] = useState(false);
  const BASE_URL = getBaseUrl();


  // Fetch link token on load
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/plaid/create-link-token`, { userId: '12345' });
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    fetchLinkToken();
  }, []);

  const onSuccess = async (publicToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/plaid/exchange-public-token`, { publicToken });
      setAccessToken(response.data.access_token);
      fetchAccounts(response.data.access_token);
      console.log(response.data,"success")
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };

  const fetchAccounts = async (accessToken) => {
    try {
        console.log("accounts",accessToken)
      const response = await axios.post(`${BASE_URL}/plaid/accounts`, { accessToken });
      setAccounts(response.data.accounts);
    //   fetchTransactions(accessToken, '2023-05-01', '2023-05-31'); // Replace with desired start and end dates
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const fetchTransactions = async (accessToken, startDate, endDate) => {
    try {
      const response = await axios.post(`${BASE_URL}/plaid/transactions`, {
          accessToken, startDate, endDate 
      });
      console.log('Transactions:', response.data);
      setTransactionsRes(response)
      setAccounts(response.data?.accounts)
      setTransactions(response.data?.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure the message is coming from a trusted origin
      // if (event.origin !== "http://localhost:3000") return;
      if(event.origin !== "https://billing-prototype-frontend.vercel.app"){
        return;
      }

      const { accessToken,realmId } = event.data;
      if (accessToken) {
        // Store the token in localStorage
        localStorage.setItem("quickBooksAccessToken", accessToken);
        localStorage.setItem("quickBooksRealmId", realmId);
        setIsQuickBooksConnected(true);
        // Optionally, close the popup if still open
        if (event.source) event.source.close();
      }
    };

    window.addEventListener("message", handleMessage);

    // Check if already connected
    const token = localStorage.getItem("quickBooksAccessToken");
    if (token) {
      setIsQuickBooksConnected(true);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleConnectQuickbooks = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open a popup window for OAuth
    window.open(
      // "http://localhost:4000/quickbooks/connect",
      `${BASE_URL}/quickbooks/connect`,
      "QuickBooks Connection",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleDisconnectQuickbooks = () => {
    localStorage.removeItem("quickBooksAccessToken");
    localStorage.removeItem("quickBooksRealmId");
    setIsQuickBooksConnected(false);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });
  const handleFetchTransactions = () => {
    const accessToke = accessToken;
    const startDate = '2023-04-14';
    const endDate = '2025-01-01';

    fetchTransactions(accessToke, startDate, endDate);
  };

  const getAccountIcon = (subtype) => {
    switch (subtype.toLowerCase()) {
      case 'checking':
        return <CreditCard className="w-5 h-5" />
      case 'savings':
        return <Wallet className="w-5 h-5" />
      default:
        return <Building className="w-5 h-5" />
    }
  }
  const downloadCSV = () => {
    if (!transactions.length) return;

    const headers = Object.keys(transactions[0]);
    const csvRows = [headers.join(','), ...transactions.map(tx => headers.map(header => JSON.stringify(tx[header] || '')).join(','))];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const handleFetchQuickbooksTransactions = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/quickbooks/transactions`, 
      {
        headers: {
          access_token: localStorage.getItem("quickBooksAccessToken"),
          realmId: localStorage.getItem("quickBooksRealmId")
        }
      });
    setTransactions(response.data)
  }catch(error){
    console.error("Error fetching quickbooks transactions:", error)
  }
}

const exportToJson = () => {
  const jsonData = JSON.stringify(transactionsres, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transactions.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
      const [payments, setPayments] = useState([
        { date: '2023-05-15', company: 'Blue Cross Blue Shield', amount: 5000.00, status: 'Reconciled' },
        { date: '2023-05-14', company: 'Aetna', amount: 3500.00, status: 'Pending' },
        { date: '2023-05-13', company: 'UnitedHealthcare', amount: 4200.00, status: 'Reconciled' },
      ]);
  return (
    <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Connect Quickbooks or Bank Account</h2>
    <p className="text-gray-600 mb-4">Link your financial accounts for automatic reconciliation</p>
    
    <div className="flex space-x-4 mb-8">
      {!isQuickBooksConnected ? (
            <button
              onClick={handleConnectQuickbooks}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Connect to QuickBooks
            </button>
          ) : (
            <button
              onClick={handleDisconnectQuickbooks}
              className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              QuickBooks Connected
            </button>
          )}
      <button 
        onClick={() => open()} 
        disabled={!ready}
        className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Connect Bank Account via Plaid
      </button>
    </div>

    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment deposits from insurance companies</h3>
    {/* {accounts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Linked Accounts</h3>
          <ul>
            {accounts.map((account) => (
              <li key={account.account_id}>
                {account.name} - {account.subtype} (${account.balances.available})
              </li>
            ))}
          </ul>
        </div>
      )} */}

<div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

     {accessToken &&  <button
        onClick={handleFetchTransactions}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Transactions
      </button>}
      {isQuickBooksConnected && <button
        onClick={handleFetchQuickbooksTransactions}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Transactions
      </button>}

      {transactions.length > 0 && (
                <button
                    onClick={downloadCSV}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                    Download Transactions CSV
                </button>
            )}

      <div>

      {transactions.length > 0 && <button
                    onClick={exportToJson}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                    Download Transactions JSON
                </button>}
      <div className="col-span-1 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Linked Accounts</h3>
            <div className="space-y-2">
              {accounts?.map((account) => (
                <button
                  key={account.account_id}
                  onClick={() => setSelectedAccount(account?.account_id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    selectedAccount === account?.account_id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {getAccountIcon(account?.subtype)}
                  <div className="flex-1">
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-500">
                      ${account.balances.available?.toFixed(2) || account.balances.current?.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction?.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction?.name !== '' ? transaction?.name : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${typeof(transaction?.amount) === 'number' ? transaction?.amount.toFixed(2) : transaction?.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof(transaction?.category) === 'string' ? transaction?.category : transaction?.category?.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  payment.status === 'Reconciled' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
  </div>
  )
}

export default LinkAccount