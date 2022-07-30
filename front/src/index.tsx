import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from './app/store'
import { LoginTop } from './features/login/components/pages/LoginTop'
import { TaskTop } from './features/task/components/pages/TaskTop'
import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  /* NOTE: 
    React 18 + react-router-dom v5 の時、`React.StrictMode` に
    問題があり history.push() が動かないため `React.StrictMode` をコメントアウト。
    https://github.com/facebook/react/issues/21674 */
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginTop} />
        <Route exact path="/tasks" component={TaskTop} />
      </Switch>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
