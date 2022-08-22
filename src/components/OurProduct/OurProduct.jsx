import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'

import styles from './OurProduct.module.scss'
import data from '../../data'
import { addCart } from '../../redux/cart/cartSlice'
import { loadCart, getAllProductsOnCart } from '../../redux/cart/cartSlice'
import { useEffect } from 'react'
import images from '../../assets/images'

const cx = classNames.bind(styles)

const Products = () => {
    const dispatch = useDispatch()
    const cart = useSelector(getAllProductsOnCart)

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    const handleAddCart = (id) => {
        const isCart = cart.some((item) => item.id === id)

        if (!isCart) {
            let product = data.shoes.filter((item) => item.id === id)[0]
            product = { ...product, count: 1 }
            dispatch(addCart(product))
        }
    }

    return (
        <div className={cx('shop-items')}>
            {data.shoes.map((item) => (
                <div key={item.id} className={cx('shop-item')}>
                    <div
                        className={cx('item-img')}
                        style={{ background: item.color }}
                    >
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className={cx('item-name')}>{item.name}</div>
                    <div className={cx('item-description')}>
                        {item.description}
                    </div>
                    <div className={cx('item-bottom')}>
                        <div className={cx('item-price')}>
                            ${item.price.toFixed(2)}
                        </div>
                        {!cart.some((cartItem) => cartItem.id === item.id) ? (
                            <button
                                className={cx('item-button')}
                                onClick={() => handleAddCart(item.id)}
                            >
                                ADD TO CART
                            </button>
                        ) : (
                            <button className={cx('item-added-cart')}>
                                <img src={images.check} alt="Checked" />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products
