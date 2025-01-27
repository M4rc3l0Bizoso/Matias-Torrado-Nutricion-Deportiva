const express = require('express');
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TU_ACCESS_TOKEN', // Access Token 
});

const router = express.Router();

router.post('/create_preference', async (req, res) => {
    const { title, price, quantity } = req.body;

    const preference = {
        items: [
            {
                title: title, // Título del producto o servicio
                unit_price: parseFloat(price), // Precio del producto o consulta
                quantity: parseInt(quantity), // Cantidad
            },
        ],
        back_urls: {
            success: 'http://localhost:3000/success.html', // Página de éxito
            failure: 'http://localhost:3000/failure.html', // Página de fallo
            pending: 'http://localhost:3000/pending.html', // Página de pago pendiente
        },
        auto_return: 'approved', // Retorno automático si el pago se aprueba
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error('Error creando la preferencia:', error);
        res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
    }
});

module.exports = router;
