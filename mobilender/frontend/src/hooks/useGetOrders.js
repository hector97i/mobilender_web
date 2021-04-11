import { useEffect, useState } from 'react';
import { getOrders } from '../helpers/getOrders'

export const useGetOrders = () => {

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {

        getOrders()
            .then(orders => {

                setState({
                    data: orders,
                    loading: false
                });
            })

    }, [])

    return state;
}

export default useGetOrders;
