import classNames from 'classnames'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { useGetCarts } from '../api/cart.api'
import NoProducts from './NoProducts'
import ProductItem from './product/ProductItem'

const useStyles = createUseStyles(theme => ({
    root: {
        flex: 1,
        height: 'calc(100vh - 190px)',
        overflow: 'auto',
        paddingRight: 10
    },
    noProduct: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

const ProductDisplay = props => {
    const { products } = props;
    const classes = useStyles()
    const isProductEmpty = products.length === 0
    
    const { cart } = useGetCarts() || []
    
    let allProducts = products.map(product => {
        let count = 0;
        for(let c of cart) {
            if(product?.objectId === c?.product?.objectId) {
                count++
            }
        }
        return {...product, count: count}
    })

    return (
        <div className={classNames(classes.root, {[classes.noProduct]: isProductEmpty})}>
            { isProductEmpty ? 
                <NoProducts info='Pas de produits selectionné'/>
            : 
                <div className={classes.productsItem}>
                    {allProducts.map((product, index) => <ProductItem key={index} product={product} />)}
                </div>
            }
        </div>
    )
}

export default ProductDisplay
