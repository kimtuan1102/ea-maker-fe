export default {
    // ADD_ITEM(state, item) {
    //   state.products.unshift(item)
    // },
    // SET_PRODUCTS(state, products) {
    //   state.products = products
    // },
    // // SET_LABELS(state, labels) {
    // //   state.eventLabels = labels
    // // },
    // UPDATE_PRODUCT(state, product) {
    //     const productIndex = state.products.findIndex((p) => p.id == product.id)
    //     Object.assign(state.products[productIndex], product)
    // },
    // REMOVE_ITEM(state, itemId) {
    //     const ItemIndex = state.products.findIndex((p) => p.id == itemId)
    //     state.products.splice(ItemIndex, 1)
    // },
  
    /////////// Transaction////////////
    // Them vao mang
    SET_TRANSACTION(state, arrayData){
      state.dataTransactions = arrayData
    }, 

    UPDATE_ITEM(state, payload){
      //console.log("ket qua tra ve:" + JSON.stringify(payload))
      const ItemIndex = state.dataTransactions.findIndex((p) => p.id == payload.id)
      const values = payload.value
      Object.keys(values).forEach(obj=>{
        console.log("Key->"+obj+ "value->"+values[obj]);
        //Cap nhat lai gia tri
          state.dataTransactions[ItemIndex][obj] = values[obj]
     });
     
    },
    SET_ACCOUNT_MT4_PARENT(state, arrayData){
      state.dataAccountMt4Parent = arrayData.filter(c=>c.is_parent==true) 
      //.filter(c=>c.is_parent==true)
    },

    SET_SERVER_IP(state, arrayData){
      state.dataServerIp = arrayData
    },

    SET_ACCOUNT_CONFIG(state, arrayData){
      state.dataAccountConfigs = arrayData
    },

    UPDATE_ITEM_ACCOUNT_CONFIG(state, payload){
      //console.log("ket qua tra ve:" + JSON.stringify(payload))
      const ItemIndex = state.dataAccountConfigs.findIndex((p) => p.id == payload.id)
      const values = payload.value
      Object.keys(values).forEach(obj=>{
        console.log("Key->"+obj+ "value->"+values[obj]);
        //Cap nhat lai gia tri
          state.dataAccountConfigs[ItemIndex][obj] = values[obj]
     });
     
    },

  }