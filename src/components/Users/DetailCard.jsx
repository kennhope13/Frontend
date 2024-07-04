import { Container, Typography, Box, Grid, TextField, Avatar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
const DetaiCard = () => {
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [img, setImg] = useState([]);
    const [Price, setPrice] = useState('');
    useEffect(() => {
        const load = async () => {
            const res = await axios.post(`/order`)
            //console.log("Data: ", res.data.data.dogItems.map((items) => items.imageUrl));
            if (res.data.data===null) {
                setName('');
                setAddress('');
                setPrice('');
                setImg([]);
            } else {
                setName(res.data.data.Name);
                setAddress(res.data.data.Address);
                setPrice(res.data.data.TotalPrice);
                setImg(res.data.data.dogItems.map((items) => ({ name: items.name, imageUrl: items.imageUrl })));
            }
            return res
        }
        load();
    }, [])

    return (
        <>

            <Container>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h4" sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }} textAlign={"center"} gutterBottom>ĐƠN HÀNG</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">

                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Tên"
                                value={Name}
                                sx={{ mb: 4 }}

                            />
                            <TextField
                                fullWidth
                                label="Địa chỉ nhận hàng"
                                value={Address}
                                sx={{ mb: 3 }}

                            />

                            <Typography sx={{ ml: 2 }}>Danh sách chó: </Typography>
                            <Box sx={{ border: '1px solid gray', borderRadius: '5px', padding: 2, mb: 4 }}>
                                {img.map((item, index) => (
                                    <Box
                                        sx={{ display: 'inline-grid' }}>
                                        <Typography >{item.name}</Typography>
                                        <Avatar
                                            key={index}
                                            alt={item.name}
                                            src={`upload/${item.imageUrl}`}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mb: 5,
                                                mt: 2,
                                                mr: 5,
                                                display: 'inline-flex',
                                                borderRadius: '5px',
                                                border: '1px solid gray'
                                            }}
                                        />

                                    </Box>
                                ))}
                            </Box>


                            <TextField
                                fullWidth
                                label="Tổng thanh toán"
                                value={`${Price}$`}
                                sx={{ mb: 4 }}

                            />

                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </>
    )
}
export default DetaiCard