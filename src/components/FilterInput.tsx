import { ChangeEvent } from "react"
import { categories } from "../data/catetgories"
import { useBudget } from "../hooks/useBudget"

const FilterInput = () => {
    const { state, dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'ADD_FILTER_CATEGORY', payload: { id: e.target.value } })
    }
    
  return (
    <section className='bg-white shadow-lg rounded-lg p-10'>
      <form >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
                Filtrar Gastos
            </label>
            <select 
                id="category" 
                className="bg-slate-100 p-3 flex-1 rounded-lg" name='category'
                value={state.currentCategory}
                onChange={handleChange}    
            >
                <option value=''>-- Todas las categorias --</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
      </form>
    </section>
  )
}

export default FilterInput
