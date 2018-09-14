const get = (req, res) => {
  res.status(200).send({message: 'ok, get!'});
}

module.exports = get;