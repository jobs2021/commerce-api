const success = (res, data) => {
  const response = data
  res.status(200).json(response)
}

const successCreated = (res, data) => {
  const response = data
  res.status(201).json(response)
}

export {
  success,
  successCreated
}
