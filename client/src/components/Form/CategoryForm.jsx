import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {



    
  return (
    <div>
        <form onSubmit={handleSubmit}>
             <input type="text" className="form-control" placeholder="Enter New Ctegory" 
       value={value}
        onChange={(e) => setValue(e.target.value)}></input>
        <button className='bg-blue-500 text-white rounded-md'>Submit </button>
        </form>


     

    </div>
  )
}

export default CategoryForm