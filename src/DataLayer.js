import React, { createContext, useContext, useReducer } from 'react'

export const DataLayerContext = createContext()

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
)

// To have access to the data_layer
export const useDataLayerValue = () => useContext(DataLayerContext)
