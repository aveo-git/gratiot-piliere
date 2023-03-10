import React from 'react'
import { createUseStyles } from 'react-jss'
import { useGetProducts } from '../api/product.api'
import ProductItem from './product/ProductItem'

const useStyles = createUseStyles(theme => ({
    root: {
        flex: 1,
        height: 'calc(100vh - 190px)',
        overflow: 'auto',
        paddingRight: 10
    },
    productsItem: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 200px)',
        gridGap: 10,
        justifyContent: 'space-between'
        // overflowX: 'hidden',
        // overflowY: 'scroll'
    }
}))

const ProductDisplay = () => {
    const classes = useStyles()
    const { products } = useGetProducts()
    return (
        <div className={classes.root}>
            <div className={classes.productsItem}>
                {products.map(product => <ProductItem product={product} />)}
            </div>
        </div>
    )
}

export default ProductDisplay
