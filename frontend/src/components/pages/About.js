import React from 'react';
import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material';
import image from './smartfridge.jpg'


//about Komponente @author: Tom Schönfeld
const About = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#e0f7fa', padding: 2, }}>
            <Card sx={{ maxWidth: 800, padding: 2, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image= {image}
                    alt="Smart Fridge"
                />
                <CardContent>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        About our Application:
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Welcome to our SmartFridge application!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        <strong>Key Features:</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" component="ul" paragraph>
                        <li>Inventory management</li>
                        <li>Cooking Recipes</li>
                        <li>Recipe Management</li>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        We want to minimize food waste and help you to cook delicious meals with the ingredients you have at home.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Thank you for using our application!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default About;
