import { IconPlaystationX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useGetAllCategories, useGetProducts, useProductCategory } from '../api/product.api'
import Button from '../components/Button'
import Text from '../components/Text'
import TextField from '../components/TextField'
import { capitalizeFirstLetter, WIDTH_RIGHT_SECTION } from '../misc/utils'

const useStyles = createUseStyles(theme => ({
    root: {
        width: WIDTH_RIGHT_SECTION,
        position: 'relative',
    },
    sectionTitle: {
        color: '#98244D'
    },
    iconReset: {
        position: 'absolute',
        right: 25,
        top: 5,
        cursor: 'pointer',
        display: ({hasFilter}) => hasFilter ? 'revert' : 'none'
    },
    formFilter: {
        marginTop: 30,
        '& select': {
            width: 253
        },
        '& input': {
            width: 211
        }
    },
    sideByside: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        width: 250,
        '& input': {
            width: 80
        }
    }
}))

const Filtre = () => {
    
    const [hasFilter, setHasFilter] = useState(false)
    const { products, refetch } = useGetProducts() || []
    const { categories } = useGetAllCategories() || []
    const { mutate: productCategory } = useProductCategory()
    const countItem = products.length
    const classes = useStyles({hasFilter})
    
    const _handleCategory = (e) => {
        setHasFilter(true)
        productCategory(e.target.value)
    }

    const _resetFilter = () => {
        setHasFilter(false)
        refetch()
    }

    const _handleName = (e) => {
        console.log('e.target.value :>> ', e.target.value);
    }

    return (
        <div className={classes.root}>
            <IconPlaystationX className={classes.iconReset} onClick={_resetFilter} />
            <Text styles={{ containerText: classes.sectionTitle, subtitle: classes.subtitle }} variant='h3' subtitle={`${countItem} produit(s)`}>Filtre</Text>
            <div className={classes.formFilter}>
                <TextField onChange={_handleCategory} type='select' label="Catégorie">
                    <option value=''>Selectionner une catégorie</option>
                    {categories.map((item, index) => <option key={index} value={item}>{capitalizeFirstLetter(item)}</option>)}
                </TextField>
                <TextField onChange={_handleName} label="Nom"/>
                <TextField label="Contenance"/>
                <TextField label="Moins de (€)"/>
                <div className={classes.sideByside}>
                    <TextField label="Compris entre"/>
                    <TextField/>
                </div>
                <TextField label="Millesime"/>
            </div>
        </div>
    )
}

export default Filtre
