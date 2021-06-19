import React from 'react'

export default function GameSearch() {
  return (
    <div className="mt-2 mb-4">

      <div>
        <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
        <datalist id="datalistOptions">
          <option value="San Francisco" />
          <option value="New York" />
          <option value="Seattle" />
          <option value="Los Angeles" />
          <option value="Chicago" />
        </datalist>
      </div>
      
    </div>
  )
}
