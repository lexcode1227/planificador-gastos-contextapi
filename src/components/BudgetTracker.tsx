import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
  
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% Gastado `}
          styles={buildStyles({
            textSize: '8',
            textColor: percentage === 100 ? '#DC2626' : '#3b82f6',
            pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#f5f5f5',
          })}
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <button 
          className='bg-pink-600 w-full p-2 text-white font-bold uppercase rounded-lg'
          onClick={() => dispatch({ type: 'RESET' })}
        >
            Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </section>
  )
}

export default BudgetTracker
