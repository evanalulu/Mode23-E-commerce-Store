export const existingCartItem = ({
    previousCartItems,
    nextCartItem
  }) => {
    return previousCartItems.find(
      cartItem => cartItem.documentID === nextCartItem.documentID
    );
  };

export const handleAddToCart = ({
    previousCartItems,
    nextCartItem
}) => {
    const cartItemExists = existingCartItem({previousCartItems, nextCartItem});

    if (cartItemExists) {
        return previousCartItems.map(cartItem => 
            cartItem.documentID == nextCartItem.documentID
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem
        );
    }

    return [
        ...previousCartItems,
        {
            ...nextCartItem,
            quantity: 1
        }
    ];
};

export const handleRemoveCartItem = ({
    previousCartItems,
    cartItemToRemove
  }) => {
    return previousCartItems.filter(item => item.documentID !== cartItemToRemove.documentID);
};

export const handleReduceCartItem = ({
    previousCartItems,
    cartItemToReduce
}) => {
    const existingCartItem = previousCartItems.find(cartItem =>
        cartItem.documentID === cartItemToReduce.documentID);

        if (existingCartItem.quantity === 1) {
            return previousCartItems.filter(
                cartItem => cartItem.documentID !== existingCartItem.documentID
            );
        }

        return previousCartItems.map(cartItem =>
        cartItem.documentID === existingCartItem.documentID?
        {
            ...cartItem,
            quantity: cartItem.quantity - 1
        } : cartItem) 
};
