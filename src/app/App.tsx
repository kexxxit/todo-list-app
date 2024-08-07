import React from 'react'
import './App.css'
import { Main } from '../pages/main'
import { RootStoreContext } from './RootStoreContext'
import RootStore from './stores/RootStore'

function App() {
    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <div className='container mx-auto px-16 text-lg h-full'>
                <Main />
            </div>
        </RootStoreContext.Provider>
    )
}

export default App
