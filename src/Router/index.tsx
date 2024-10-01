import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'
import { Login } from '../view/pages/Login'
import { Register } from '../view/pages/Register'
import { AuthLayout } from '../view/layouts/AuthLayout'
import { ConfirmationLayout } from '../view/layouts/ConfirmationLayout'
import { AccountValidation } from '../view/pages/AccountValidation'
import { Dashboard } from '../view/pages/Dashboard'
import { ForgotPassword } from '../view/pages/ForgotPassword'
import { ResetPassword } from '../view/pages/ResetPassword'

export function Router() {  
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route element={<AuthLayout/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route element={<ForgotPassword/>} path='/forgot'/>
            <Route element={<ResetPassword/>} path='/reset'/>
          </Route>
          <Route element={<ConfirmationLayout/>}>
            <Route path='/confirmation' element={<AccountValidation/>}/>
          </Route>
        </Route>

        
        <Route element={<AuthGuard isPrivate/>}>
          <Route path='/' element={<Dashboard/>}/>
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}