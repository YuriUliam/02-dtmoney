import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'

import { api } from '../services/api'

interface Transaction {
  id: string
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Array<Transaction>
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  useEffect(() => {
    api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
  }, [])

  const createTransaction = useCallback(async (transactionInput: TransactionInput) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions(oldTransactions => [...oldTransactions, transaction])
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const transactionsContext = useContext(TransactionsContext)

  if (transactionsContext == null) throw new Error('Component must be wrapped by TransactionsContext')

  return transactionsContext
}
