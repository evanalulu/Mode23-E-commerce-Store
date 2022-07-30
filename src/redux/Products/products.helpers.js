import { firestore } from "../../firebase/utils";

export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProduct = ({ filterType, startAfterDoc, persistData=[] }) => {
  return new Promise((resolve, reject) => {
    
    const pageSize = 6;

    let ref = firestore.collection('products').limit(pageSize);

    if(filterType) ref = ref.where('productCategory', '==', filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then(snapshot => {
        const count = snapshot.size;

        const data = [
          ...persistData,
          ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[count - 1],
          isLastPage: count < 1
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProducto = productID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          resolve(
            snapshot.data()
          );
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}
