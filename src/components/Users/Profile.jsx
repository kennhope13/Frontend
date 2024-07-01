import { useEffect, useRef, useState } from "react";
import './Profile.css'
import Cookies from 'js-cookie';
import { Container, Typography, Avatar, Box, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
const Profile = () => {
    const [Image, setImage] = useState('');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    useEffect(()=>{
        const profile = async ()=>{
            const token  = Cookies.get('TOKEN');
            if(!token){
                console.log("Không có token");
            }else{
                try{
                    const res = await axios.get("http://localhost:3001/",{
                        withCredentials:true,
                    });
                    //console.log(res.data.data.data);
                    setImage(res.data.data.data.Image);
                    setName(res.data.data.data.Name);
                    setEmail(res.data.data.data.Email);
                }catch(err){
                    console.log("Lỗi Token", err);
                }
            }
        }
        profile();
    },[])
    return (
        <>

            <Container>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h4" sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }} textAlign={"center"} gutterBottom>Thông tin cá nhân</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
                        <Grid item xs={12} sm={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                <Avatar
                                    alt="Profile Picture"
                                    src={`upload/${Image}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: 'white',
                                        '&:hover': {
                                            bgcolor: 'white',
                                        },
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Tên"
                                value={Name}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                value={Email}
                                sx={{ mb: 3 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </>
    )
}
export default Profile