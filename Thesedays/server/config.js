module.exports = {
    port: process.env.PORT || 6000,
    db: {
      uri: process.env.DB_URI || 'mongodb://localhost/my-database'
    }
  };
  