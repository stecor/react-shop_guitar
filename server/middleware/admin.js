let admin =(req,res,next) =>{
  if( req.user.role === 0 ){
    return res.send('Sorry, you are not allowed.')
  }

  next()
}

module.exports = { admin };
