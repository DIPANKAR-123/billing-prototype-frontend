import React from 'react'
import { usePlaidLink } from 'react-plaid-link';
const PlaidLinkComponent = ({ linkToken, onSuccess }) => {
    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (publicToken) => onSuccess(publicToken),
      });
  return (
       
    
          <button onClick={open} disabled={!ready}>
            Connect Bank Account
          </button>
  )
}

export default PlaidLinkComponent