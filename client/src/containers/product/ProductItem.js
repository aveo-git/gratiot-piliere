import { IconHeart, IconHeartFilled, IconMinus, IconPlus } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import Price from '../../components/Price';
import Button from '../../components/Button';
import { padWithLeadingZeros } from '../../misc/utils';

const useStyles = createUseStyles(theme => ({
	root: {
        width: 200,
        height: 380,
        textAlign: 'center',
        position: 'relative',
        margin: '0 10px'
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
        height: 169,
        paddingTop: 25,
        '& img': {
            width: 169
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
        '& a': {
            color: '#98244D',
            textDecoration: 'none'
        }
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
    }
}));

const ProductItem = props => {
    const { isSelected = false, data } = props;
    const { name, description, count, isVoted, price, image } = data
    const classes = useStyles({isSelected})
    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <div className={classes.heart}>{isVoted ? <IconHeartFilled /> : <IconHeart/>}</div>
                {count > 0 && <div className={classes.counter}>{padWithLeadingZeros(count)}</div>}
                <div className={classes.image}><img src={image} alt={'bottle'} /></div>
                <div>
                    <div className={classes.title}><Link>{name}</Link></div>
                    <div className={classes.subtitle}>{description}</div>
                </div>
            </div>
            <div className={classes.action}>
                <div className={classes.price}>
                    <Price price={price} />
                    {/* <div>TTC</div> */}
                </div>
                <div className={classes.buttonGroup}>
                    {count > 0 && <Button icon={<IconMinus />} styles={{ container: classes.buttonMinus }} size='tiny' variant='secondary' />}
                    <Button icon={<IconPlus />} styles={{ container: classes.buttonPlus }} size='tiny' variant='secondary' />
                </div>
            </div>
        </div>
    )
}

export default ProductItem
