exports.errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: '서버 에러 발생!' });
  };
  