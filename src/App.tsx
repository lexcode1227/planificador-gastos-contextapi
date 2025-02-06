import { useEffect } from 'react'
import BudgetForm from './components/BudgetForm'
import BudgetTracker from './components/BudgetTracker'
import ExpendModal from './components/ExpendModal'
import ExpenseList from './components/ExpenseList'
import { useBudget } from './hooks/useBudget'
import FilterInput from './components/FilterInput'

function App() {

  const { state } = useBudget()
  const isValidBudget = () => state.budget > 0

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className='bg-blue-500 py-8 max-h-72'>
        <h1 className='uppercase text-center text-4xl font-black text-white'>
          Planificador de Gastos
        </h1>
      </header>
      <main className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10'>
        {isValidBudget() ? <BudgetTracker/> : <BudgetForm />}
      </main>
      {isValidBudget() && (
        <section className='max-w-3xl mx-auto py-10'>
          <FilterInput/>
          <ExpendModal/>
          <ExpenseList/>
        </section>
      )}
    </>
  )
}

export default App
