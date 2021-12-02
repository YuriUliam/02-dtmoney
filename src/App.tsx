import { useState, useCallback } from 'react'
import Modal from 'react-modal'

import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'

import { TransactionsContextProvider } from './hooks/useTransactions'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  const handleOpenNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true)
  }, [setIsNewTransactionModalOpen])
  
  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false)
  }, [setIsNewTransactionModalOpen])

  return (
    <TransactionsContextProvider>
      <Header onOpenTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsContextProvider>
  );
}
