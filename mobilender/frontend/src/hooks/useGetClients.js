import { useEffect, useState } from 'react';
import { getClients } from '../helpers/getClients';

export const useGetClients = () => {

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {

        getClients()
            .then(clients => {

                setState({
                    data: clients,
                    loading: false
                });
            })

    }, [])

    return state;
}

export default useGetClients;
