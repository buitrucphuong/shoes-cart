import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        loadCart: (state) => {
            const cartItems =
                JSON.parse(localStorage.getItem('cartItems')) || []
            return (state = cartItems)
        },
        addCart: (state, { payload }) => {
            state.push(payload)
            localStorage.setItem('cartItems', JSON.stringify(state))
        },
        removeCart: (state, { payload }) => {
            state.splice(payload, 1)
            localStorage.setItem('cartItems', JSON.stringify(state))
        },
        increaseCart: (state, { payload }) => {
            state.find((item) => item.id === payload).count++
            localStorage.setItem('cartItems', JSON.stringify(state))
        },
        decreaseCart: (state, { payload }) => {
            state.find((item) => item.id === payload).count--
            localStorage.setItem('cartItems', JSON.stringify(state))
        },
    },
})

export const { addCart, loadCart, removeCart, increaseCart, decreaseCart } =
    cartSlice.actions
export const getAllProductsOnCart = (state) => state.cart
export default cartSlice.reducer
