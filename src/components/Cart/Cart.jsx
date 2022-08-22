import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Cart.module.scss'

import {
    getAllProductsOnCart,
    removeCart,
    increaseCart,
    decreaseCart,
} from '../../redux/cart/cartSlice'
import images from '../../assets/images'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

const Cart = () => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const cart = useSelector(getAllProductsOnCart)

    const handleRemoveCart = (id) => {
        setShow((show) => !show)
        dispatch(removeCart(id))
    }

    const handleIncreaseCart = (id) => {
        dispatch(increaseCart(id))
    }

    const handleDecreaseCart = (item, index) => {
        if (item.count > 1) {
            dispatch(decreaseCart(item.id))
        } else {
            dispatch(decreaseCart(item.id))
            dispatch(removeCart(index))
        }
    }

    useEffect(() => {
        if (show) setShow(true)
    }, [show])

    const onAnimationEnd = () => {
        if (!show) setShow(false)
    }

    return (
        <>
            <div className={cx('cart-items')}>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={item.id} className={cx('cart-item')}>
                            <div className={cx('cart-item-left')}>
                                <div
                                    className={cx('cart-item-image', {
                                        'show-animation ': !show,
                                    })}
                                    style={{
                                        backgroundColor: item.color,
                                    }}
                                    onAnimationEnd={onAnimationEnd}
                                >
                                    <img src={item.image} alt={item.name} />
                                </div>
                            </div>

                            <div className={cx('cart-item-right')}>
                                <div className={cx('cart-item-name')}>
                                    {item.name}
                                </div>
                                <div className={cx('cart-item-price')}>
                                    ${item.price.toFixed(2)}
                                </div>
                                <div className={cx('cart-item-actions')}>
                                    <div className={cx('cart-item-count')}>
                                        <button
                                            onClick={() =>
                                                handleDecreaseCart(item, index)
                                            }
                                            className={cx(
                                                'cart-item-count-btn',
                                            )}
                                        >
                                            <img
                                                src={images.minus}
                                                alt="minus"
                                            />
                                        </button>
                                        <div
                                            className={cx(
                                                'cart-item-count-number',
                                            )}
                                        >
                                            {item.count}
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleIncreaseCart(item.id)
                                            }
                                            className={cx(
                                                'cart-item-count-btn',
                                            )}
                                        >
                                            <img src={images.plus} alt="plus" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveCart(index)}
                                        className={cx('cart-item-remove')}
                                    >
                                        <img src={images.trash} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={cx('cart-empty')}>Your cart is empty.</div>
                )}
            </div>
        </>
    )
}

export default Cart
