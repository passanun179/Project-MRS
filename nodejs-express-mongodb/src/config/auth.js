const auth = {}

auth.secret = process.env.SECRET_KEY || 'secret'
auth.issuer = process.env.ISSUER || 'issuer'

module.exports = auth