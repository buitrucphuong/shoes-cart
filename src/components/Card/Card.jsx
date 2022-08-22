import classNames from 'classnames/bind'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import styles from './Card.module.scss'
import images from '../../assets/images'
import { getAllProductsOnCart } from '../../redux/cart/cartSlice'

const cx = classNames.bind(styles)

const Card = ({ children, title, isTotal }) => {
    const cart = useSelector(getAllProductsOnCart)

    const total = useMemo(() => {
        const result = cart.reduce((result, item) => {
            return result + item.price * item.count
        }, 0)

        return result
    }, [cart])

    return (
        <>
            <div className={cx('card')}>
                <div className={cx('card-top')}>
                    <img src={images.nike} alt="Nike" />
                </div>
                <div className={cx('card-title')}>
                    {title}
                    {isTotal && (
                        <span className={cx('card-total')}>
                            ${total.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className={cx('card-body')}>{children}</div>
            </div>
        </>
    )
}

export default Card
