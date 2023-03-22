import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { productKeys, useGetAllCategories, useGetProducts, useGetProductsFilteredByCategory, useProductCategory } from '../api/product.api'
import Button from '../components/Button'
import Text from '../components/Text'
import TextField, { fakeData } from '../components/TextField'
import { capitalizeFirstLetter, groupProductByCategory, WIDTH_RIGHT_SECTION } from '../misc/utils'

const useStyles = createUseStyles(theme => ({
    root: {
        width: WIDTH_RIGHT_SECTION,
    },
    sectionTitle: {
        color: '#98244D'
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
    const classes = useStyles()

    const { products, refetch } = useGetProducts() || []
    const { categories } = useGetAllCategories() || []
    const { mutate: productCategory } = useProductCategory()
    const countItem = products.length

    const _handleCategory = (e) => {
        productCategory(e.target.value)
    }

    const _handleName = (e) => {
        console.log('e.target.value :>> ', e.target.value);
    }

    return (
        <div className={classes.root}>
            <Text styles={{ containerText: classes.sectionTitle, subtitle: classes.subtitle }} variant='h3' subtitle={`${countItem} produit(s)`}>Filtre</Text>
            <div className={classes.formFilter}>
                <TextField onChange={_handleCategory} type='select' label="Catégorie">
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
                <Button textLabel="Test" variant="primary" onClick={refetch} />
            </div>
        </div>
    )
}

export default Filtre
