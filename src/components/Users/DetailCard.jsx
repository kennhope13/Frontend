import { Container, Typography, Box, Grid, TextField, Avatar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
const DetaiCard = () => {
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [arrDogs, setarrDogs] = useState([]);
    const [img, setImg] = useState([]);
    const [Price, setPrice] = useState('');
    useEffect(() => {
        const load = async () => {
            const res = await axios.post(`/order`)
            //console.log("Data: ", res.data.data.dogItems.map((items) => items.imageUrl));
            setName(res.data.data.Name);
            setAddress(res.data.data.Address);
            setarrDogs(res.data.data.dogItems.map((items) => items.name));
            setPrice(res.data.data.TotalPrice);
            setImg(res.data.data.dogItems.map((items) => items.imageUrl))
            return res
        }
        load();
    }, [])

    return (
        <>

            <Container>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h4" sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }} textAlign={"center"} gutterBottom>Đơn hàng</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">

                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Tên"
                                value={Name}
                                sx={{ mb: 2 }}

                            />
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                value={Address}
                                sx={{ mb: 2 }}

                            />


                            <TextField
                                fullWidth
                                label="Danh sách chó"
                                value={arrDogs}
                                sx={{ mb: 3 }}

                            />
                            {img.map((item, index) => (
                                <Avatar
                                    key={index}
                                    alt="Profile Picture"
                                    src={`upload/${item}`}
                                    sx={{ width: 100, height: 100, mb: 3, mr: 2, display: 'inline-flex'}}
                                />
                            ))}

                            <TextField
                                fullWidth
                                label="Tổng thanh toán"
                                value={`${Price}$`}
                                sx={{ mb: 3 }}

                            />

                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </>
    )
}
export default DetaiCard