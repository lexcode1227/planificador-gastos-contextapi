import { ChangeEvent, FormEvent, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = ()=> isNaN(budget) || budget <= 0

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'ADD_BUDGET', payload: { budget } })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir Presupuesto
        </label>
        <input 
          type="number"
          name="budget"
          id="budget"
          placeholder="Define tu presupuesto"
          className="w-full bg-white p-2 border border-gray-200 rounded-md"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input 
        type="submit"
        value={"Definir Presupuesto"}
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 text-white font-bold uppercase rounded-md disabled:opacity-40"
        disabled={isValid()}
      />
    </form>
  )
}

export default BudgetForm
