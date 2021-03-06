const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2
const UserRoutes = require('./src/api/users/users.routes');
const ProtectoraRoutes = require('./src/api/protectoras/protectoras.routes');
const MascotasRoutes = require('./src/api/mascotas/mascotas.routes');
const NewsRoutes = require('./src/api/noticias/noticias.routes');

const { setError } = require('./src/utils/error/error');
const { connectDb } = require('./src/utils/database/database');

const PORT = process.env.PORT || 8080

const app = express();

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'https://proyecto-final-react-git-master-corocottax.vercel.app', 'https://proyecto-final-react-corocottax.vercel.app', 'https://proyecto-final-react-vert.vercel.app'],
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))


app.use('/api/users', UserRoutes)
app.use('/api/protectoras', ProtectoraRoutes)
app.use('/api/mascotas', MascotasRoutes)
app.use('/api/noticias', NewsRoutes)

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})