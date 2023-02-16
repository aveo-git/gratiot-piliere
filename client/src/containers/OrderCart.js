import React from 'react'
import Drawer from '../components/Drawer'

const OrderCart = props => {
    const { open, setOpen, closeModal } = props;

    return (
        <div>
            <Drawer open={open} setOpen={setOpen} closeModal={closeModal} />
        </div>
    )
}

export default OrderCart
