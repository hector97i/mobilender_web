import { useEffect, useState } from 'react';
import { getOrderArticles } from '../helpers/getOrderArticles'

const getTotal = (articles) => {
    let total = 0.0;
    for (let i = 0; i < articles.length; i++) {
        total += articles[i].article.price * articles[i].quantity;
    }
    return total;
}

export const useGetOrderArticles = (id) => {

    const [state, setState] = useState({
        data: [],
        loading: true,
        total: 0.0
    });

    useEffect(() => {

        getOrderArticles(id)
            .then(articles => {

                setState({
                    data: articles,
                    loading: false,
                    total: getTotal(articles)
                });
            })

    }, [])

    return state;
}

export default useGetOrderArticles;
