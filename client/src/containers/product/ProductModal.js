import { IconHeart } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetOneProductById } from '../../api/product.api';
import Button from '../../components/Button';

import Drawer from '../../components/Drawer';
import NoContent from '../../components/order/NoContent';
import Text from '../../components/Text';
import { lastPath } from '../../misc/utils';

const useStyles = createUseStyles(theme => ({
	container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    productOverview: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        padding: '21px 28px 0 28px'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 34,
        textAlign: 'center',
        lineHeight: '34px',
        padding: '0 40px'
    },
    image: {
        height: 400,
        margin: '50px 0',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
    },
    description: {
        flex: 1,
        textAlign: 'center'
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    }
}));

const ProductModal = props => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const {product, refetch} = useGetOneProductById(lastPath(location.pathname))
    const { title, description, price, rating, imageUrl } = product;

    useEffect(() => {
        if(location.pathname) {
            refetch()
        }
    }, [location.pathname, refetch])

    const _rateProduct = () => {
    }

    const _closeModal = () => {
        navigate(-1)
    }

    const isProductEmpty = false;
    
    return (
        <div>
            <Drawer styles={{ header: classes.header }} open={true} closeModal={_closeModal} isModalClosable extraIcon={!isProductEmpty && <IconHeart onClick={_rateProduct}/>}>
                {isProductEmpty ? <NoContent For='product'/> : 
                    <div className={classes.container}>
                        <div className={classes.productOverview}>
                            <div className={classes.title}>{title}</div>
                            <div className={classes.image}><img src={imageUrl} alt={title} /></div>
                            <div className={classes.description}>
                                <Text variant='h3'>Description</Text>
                                <div>{description}</div>
                                <div>Prix: {price}</div>
                                <div>Rating: {rating}</div>
                            </div>
                        </div>
                        <div className={classes.cta}>
                            <Button textLabel='Ajouter au panier' variant='primary' />
                        </div>
                    </div>
                }
            </Drawer>
        </div>
    )
}

export default ProductModal