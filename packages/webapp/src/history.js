import {createBrowserHistory} from 'history';
import {historyAuthMiddleware} from './middleware';

const history = createBrowserHistory();

history.listen(historyAuthMiddleware);

export {
    history
}
