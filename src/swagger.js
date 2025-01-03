const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ushers Registration API',
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: [
        `${__dirname}/models/*.js`,
        `${__dirname}/controllers/*.js`,
        `${__dirname}/swagger.js`,
    ],
    
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification