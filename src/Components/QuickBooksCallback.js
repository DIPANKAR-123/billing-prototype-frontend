import { useEffect } from "react";

const QuickBooksCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token"); // Adjust based on your backend's response
    const realmId = params.get("realmId");
    if (accessToken && realmId) {
      window.opener.postMessage({ accessToken, realmId }, "https://billing-prototype-frontend.vercel.app/"); // Adjust origin if different
      window.close();
    } else {
      console.error("Access token not found in URL");
      window.close();
    }
  }, []);

  return <div>Processing QuickBooks Connection...</div>;
};

export default QuickBooksCallback;