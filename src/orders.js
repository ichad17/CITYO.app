import React from 'react';
import {Card} from './main.js';

function Orderitem() {
  return (
    <div className="item">
        <p>This is an example of some orders</p>
        <p>This is an example of some orders</p>
     </div>
  );
}

class Orders extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (  
        <div className="">
          <Card id="orders">
              <Orderitem/>
              <Orderitem/>
          </Card>
        </div>
      );
    }
}

export default Orders;
export {Orderitem};