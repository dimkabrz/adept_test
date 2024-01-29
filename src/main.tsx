import ReactDOM from 'react-dom/client'
import App from '../src/app/App.tsx'
import { Provider } from 'react-redux';
import {makeStore} from "./app/model/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={makeStore()}>
        <App />
    </Provider>

)
