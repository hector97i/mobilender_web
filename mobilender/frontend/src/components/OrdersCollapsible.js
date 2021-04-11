import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useGetOrders from '../hooks/useGetOrders'
import useGetOrderArticles from '../hooks/useGetOrderArticles';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row({ row }) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const { data: articles, loadingArticles, total } = useGetOrderArticles(row.id);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.client}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.served_at}</TableCell>
                <TableCell align="right">{row.order_to}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h7" gutterBottom component="div">
                                Articulos
                            </Typography>
                            <Table size="small" aria-label="elementos">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Cant.</TableCell>
                                        <TableCell>Codigo</TableCell>
                                        <TableCell>Descripcion</TableCell>
                                        <TableCell>Proveedor</TableCell>
                                        <TableCell>$ unit.</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {loadingArticles ?
                                        <Typography>Cargando...</Typography>
                                        :
                                        articles.map((article) => (
                                            <TableRow key={article.id}>
                                                <TableCell component="th" scope="row">{article.quantity}</TableCell>
                                                <TableCell>{article.article.code}</TableCell>
                                                <TableCell>{article.article.description}</TableCell>
                                                <TableCell>{article.supplier.name}</TableCell>
                                                <TableCell>{formatter.format(article.article.price)}</TableCell>
                                                <TableCell>{formatter.format(article.article.price * article.quantity)}</TableCell>
                                            </TableRow>
                                        ))}
                                    <TableRow>
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell />
                                        <TableCell>TOTAL</TableCell>
                                        <TableCell>{formatter.format(total)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function CollapsibleTable() {

    const { data: orders, loading } = useGetOrders();


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Articulos</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Fecha de creacion</TableCell>
                        <TableCell align="right">Surtido</TableCell>
                        <TableCell align="right">Centro</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        <Typography>Cargando...</Typography>
                        :
                        orders.map((order) => (
                            <Row key={order.id} row={order} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
