import React from 'react'
import Routing from './router/Routing'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          // Global Default Styling (Dark & Minimalist look)
          style: {
            background: '#000000',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          
          // Success Toast Customization
          success: {
            iconTheme: {
              primary: '#22c55e', // Green check icon
              secondary: '#ffffff',
            },
          },
          
          // Error Toast Customization
          error: {
            iconTheme: {
              primary: '#ef4444', // Red error icon
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Routing />
    </div>
  )
}

export default App
