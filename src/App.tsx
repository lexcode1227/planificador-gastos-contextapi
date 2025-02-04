import './App.css'
import BudgetForm from './components/BudgetForm'

function App() {



  return (
    <>
      <header className='bg-blue-500 py-8 max-h-72'>
        <h1 className='uppercase text-center text-4xl font-black text-white'>
          Planificador de Gastos
        </h1>
      </header>
      <main className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10'>
        <BudgetForm />
      </main>
    </>
  )
}

export default App
