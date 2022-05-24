const firestore = () => {
  return {
    collection: (nameCollection) => {
      return {
        add: (objData) => {
          return new Promise((res) => {
            res('Yup')
          })
        }
      }
    }
  }
}

const firebase = {
  firestore: firestore
}

export default jest.fn(() => {
  return firebase;
})
