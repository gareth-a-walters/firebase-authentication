import React from 'react'

import { UserProvider } from 'context/user'
import Navigation from 'navigation'

const App = () => (
  <UserProvider>
    <Navigation />
  </UserProvider>
)

export default App
