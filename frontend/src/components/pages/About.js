import React from 'react';
import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material';
import image from './smartfridge.jpg'

const About = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#e0f7fa', padding: 2 }}>
            <Card sx={{ maxWidth: 800, padding: 2, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image= {image}
                    alt="Smart Fridge"
                />
                <CardContent>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Über unsere Smartfridge:
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Wilkommen in der Smart Fridge Applikation!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        <strong>Key Features:</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" component="ul" paragraph>
                        <li>Inventarverwaltung in Echtzeit</li>
                        <li>Rezepte Kochen</li>
                        <li>Rezepte verwalten</li>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Wir wollen Lebensmittelverschwendung minimieren!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Danke das sie HdMSmartFridge ausgwählt haben!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default About;
