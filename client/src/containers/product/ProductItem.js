import { IconHeart, IconHeartFilled, IconLoader2, IconMinus, IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useCreateCart } from '../../api/cart.api';
import Button from '../../components/Button';
import Price from '../../components/Price';
import { padWithLeadingZeros } from '../../misc/utils';

const useStyles = createUseStyles(theme => ({
	root: {
        width: 200,
        height: 380,
        textAlign: 'center',
        position: 'relative',
        margin: '0 10px 0 0'
	},
    heart: {
        position: 'absolute',
        padding: '15px 0 0 15px',
        cursor: 'pointer',
        '& svg': {
            width: 30,
            height: 30,
            strokeWidth: 1,
            color: '#D84B7D'
        }
    },
    counter: {
        position: 'absolute',
        right: 18,
        top: 18,
        width: 22,
        height: 22,
        borderRadius: 50,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: ({isSelected}) => isSelected ? '#F3F3F3' : '#FBFBFB',
        borderRadius: '26px 26px 0 0',
        height: 313
    },
    image: {
        height: 196,
        overflow: 'hidden',
        '& img': {
            width: 198,
            borderRadius: '26px 26px 0 0',
        }
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 15,
        textTransform: 'uppercase',
        width: 170,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 8,
        letterSpacing: '2px',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        cursor: 'pointer',
        color: '#98244D',
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        color: '#333132',
        padding: '0 15px',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    action: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
    },
    price: {
        textAlign: 'left',
        fontSize: 10,
        display: 'flex',
        alignItems: 'center'
    },
    buttonGroup: {
        display: 'flex'
    },
    buttonPlus: {
        width: 'fit-content',
        '& span': {
            marginLeft: 0
        }
    },
    buttonMinus: {
        width: 'fit-content',
        marginRight: 10,
        '& span': {
            marginLeft: 0
        }
    },
    spinner: {
        animation: 'spin 1s infinite linear',
        color: '#a9a4a4'
    }
}));

const ProductItem = props => {
    const { product } = props;
    const [forMinus, setForMinus] = useState(false)
    const { objectId, title, description, count, isVoted, price, imageUrl } = product
    const isSelected = count > 0
    const classes = useStyles({isSelected})
    const navigate = useNavigate()
    const { mutate: createCart, isLoading } = useCreateCart()

    const _handleCount = (operand) => {
        setForMinus(operand === 'minus')
        createCart({product, operand})
    }

    const _handleProduct = () => {
        navigate(objectId)
    }

    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <div className={classes.heart}>{isVoted ? <IconHeartFilled /> : <IconHeart/>}</div>
                {count > 0 && <div className={classes.counter}>{padWithLeadingZeros(count)}</div>}
                <div className={classes.image}><img src={imageUrl} alt={'bottle'} /></div>
                <div>
                    <div className={classes.title} onClick={_handleProduct}>{title}</div>
                    <div className={classes.subtitle}>{description}</div>
                </div>
            </div>
            <div className={classes.action}>
                <div className={classes.price}>
                    <Price price={price} />
                    {/* <div>TTC</div> */}
                </div>
                <div className={classes.buttonGroup}>
                    {count > 0 && <Button onClick={() => _handleCount('minus')} icon={isLoading && forMinus ? <IconLoader2 className={classes.spinner} /> : <IconMinus />} styles={{ container: classes.buttonMinus }} size='tiny' variant='secondary' />}
                    <Button onClick={() => _handleCount('plus')} icon={isLoading && !forMinus ? <IconLoader2 className={classes.spinner} /> : <IconPlus />} styles={{ container: classes.buttonPlus }} size='tiny' variant='secondary' />
                </div>
            </div>
        </div>
    )
}

export default ProductItem