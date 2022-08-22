import classNames from 'classnames/bind'
import styles from './App.module.scss'
import Card from './components/Card/'
import Products from './components/OurProduct'
import Cart from './components/Cart'

const cx = classNames.bind(styles)

const App = () => {
    return (
        <div className={cx('app')}>
            <Card title="Our Products">
                <Products />
            </Card>
            <Card title="Your cart" isTotal>
                <Cart />
            </Card>
        </div>
    )
}

export default App
