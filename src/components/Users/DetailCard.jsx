import { Container, Typography, Box, Grid, TextField, Avatar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DetaiCard = () => {
    const [name, setName] = useState('');
    const [detailCarts, setDetailCarts] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.post('/order');
                const data = res.data.data;

                if (data) {
                    setName(data.Name);
                    setDetailCarts(data.DetailCart);
                } else {
                    setName('');
                    setDetailCarts([]);
                }
            } catch (error) {
                console.error("Error loading data: ", error);
                setName('');
                setDetailCarts([]);
            }
        };
        load();
    }, []);

    return (
        <Container>
            <Box sx={{ mt: 5 }}>
                <Typography
                    variant="h4"
                    sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }}
                    textAlign="center"
                    gutterBottom
                >
                    ĐƠN HÀNG
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }}
                    textAlign="center"
                    gutterBottom
                >
                    Tên người nhận: {name}
                </Typography>
                {detailCarts.map((cart, index) => (

                    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center" key={index}>

                        <Grid item xs={12} sm={5}>
                            <Typography
                                variant="h6"
                                sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }}
                                textAlign="center"
                                gutterBottom
                            >
                                 Đơn số: {index + 1}
                            </Typography>
                           
                            <TextField
                                fullWidth
                                label="Địa chỉ nhận hàng"
                                value={cart.Address}
                                sx={{ mb: 3 }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <Typography sx={{ ml: 2 }}>Danh sách chó:</Typography>
                            <Box sx={{ border: '1px solid gray', borderRadius: '5px', padding: 2, mb: 4 }}>
                                {cart.dog_items.map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{ display: 'inline-grid', alignItems: 'center', mb: 2 }}
                                    >
                                        <Typography>{item.name}</Typography>
                                        <Avatar
                                            alt={item.name}
                                            src={`upload/${item.imageUrl}`}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                ml: 4,

                                                borderRadius: '5px',
                                                border: '1px solid gray',

                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                            <TextField
                                fullWidth
                                label="Tổng thanh toán"
                                value={`${cart.TotalPrice}$`}
                                sx={{ mb: 4 }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Container>
    );
};

export default DetaiCard;
