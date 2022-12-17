//Middleware for unknown endpoint requests
const notFound = (req,res) => res.status(404).send('Unknown endpoint')

module.exports = notFound